# Get Image From docker Hub
FROM node:alpine
# Set build arguments (optional)
ARG CACHEBUST=1
# Add Author Info
LABEL maintainer="Yovangga Anandhika <dka.tech.dev@gmail.com>"
# adding timezone
ENV TZ=Asia/Makassar
RUN apk --no-cache add tzdata
# adding Env Variable
ENV DKA_DB_MONGO_HOST=localhost
ENV DKA_DB_MONGO_USERNAME=root
ENV DKA_DB_MONGO_PASSWORD=12345
ENV DKA_DB_MONGO_DATABASE=dka-parking-config
# -----------------------------------------------------------------
ENV DKA_SERVER_HOST=0.0.0.0
ENV DKA_SERVER_PORT=80
# -----------------------------------------------------------------
ENV DKA_HOST_ACCOUNT_SERVICE=account.services.dkaapis.com
ENV DKA_PORT_ACCOUNT_SERVICE=80
# -----------------------------------------------------------------
# -----------------------------------------------------------------
ENV DKA_MQTT_BROKER_CLIENT_ID=dka-parking-config
ENV DKA_MQTT_BROKER_PROTOCOL=mqtt
ENV DKA_MQTT_BROKER_HOST=mqtt.dkaapis.com
ENV DKA_MQTT_BROKER_PORT=1883
# -----------------------------------------------------------------
# set Working Directory
WORKDIR /home/app
# copy app source to workdir
COPY . /home/app
# move cert folder to another sys folder
# -------
# Show Directory Content
RUN ls -lah
# Install dependencies using Yarn workspaces
RUN yarn install
# Build the project (if needed for production)
RUN yarn build
# Delete SRC Folder
RUN rm -rf src
# Show Directory Content
RUN ls -lah
# Expose Port
EXPOSE 80
# Start the NestJS application
CMD ["yarn", "start:prod"]