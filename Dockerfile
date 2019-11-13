# base image
FROM node:12.13.0
RUN echo "Got Base Image"

# set working directory
RUN echo "Creating /app directory"
RUN mkdir /app
WORKDIR /app

# install and cache app dependencies
RUN echo "Copying package json"
COPY package.json /app/package.json
RUN echo "Running npm install"
RUN npm install

# add app
RUN echo "Copying files into /app"
COPY . /app

# start app
RUN echo "Running app"
CMD npm run test