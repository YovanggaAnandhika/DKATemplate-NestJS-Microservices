import mongoose, { Document } from 'mongoose';

export interface IExampleTime {
  humanize: string;
  unix: number;
}

export interface IExample extends Document {
  reference: mongoose.Schema.Types.ObjectId;
  time_created: IExampleTime
  time_updated: IExampleTime
  status: mongoose.Schema.Types.Boolean;
}
