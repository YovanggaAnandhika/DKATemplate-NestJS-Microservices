import mongoose from 'mongoose';
import { IExample } from '../model/example.model';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { AccountClientFactory } from '../config/client.factory.config';
import { ClientProxyFactory } from '@nestjs/microservices';

export const ExampleSchema = new mongoose.Schema<IExample>(
  {
    /**
     * Reference to another account, should be a valid ObjectId.
     */
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      validate: {
        validator: async function (accountId) {
          /** Checked Id Reference match to microservice user **/
          const client = ClientProxyFactory.create(AccountClientFactory);
          const result = await firstValueFrom(
            client.send('user.read.search.one.by.id', { _id: accountId }),
          );
          return result.status;
        },
        message: 'Account Reference Not Exist',
      },
    },
    time_created: {
      /**
       * Human-readable time of creation.
       */
      humanize: {
        type: mongoose.Schema.Types.String,
        default: moment(moment.now()).format('HH:mm:ss DD-MM-YYYY'),
      },
      /**
       * Unix timestamp of creation.
       */
      unix: {
        type: mongoose.Schema.Types.Number,
        default: moment(moment.now()).unix(),
      },
    },
    /**
     * Time of update.
     */
    time_updated: {
      /**
       * Human-readable time of update.
       */
      humanize: {
        type: mongoose.Schema.Types.String,
        default: moment(moment.now()).format('HH:mm:ss DD-MM-YYYY'),
      },
      /**
       * Unix timestamp of update.
       */
      unix: {
        type: mongoose.Schema.Types.Number,
        default: moment(moment.now()).unix(),
      },
    },
    /**
     * Status of the account (true or false).
     */
    status: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
  },
  { collection: 'example', versionKey: false, strict: true },
);

export const ExampleModel = mongoose.model('Example', ExampleSchema);

export default ExampleSchema;
