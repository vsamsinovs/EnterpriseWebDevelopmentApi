
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postsRouter from './public/api/posts/posts.api';
import commentsRouter from './public/api/comments/comment.api';

import bodyParser from 'body-parser';

import { loadPosts } from './postData';

import Post from './public/api/posts/post.schema'

//import { Mockgoose } from 'mockgoose';
import { nodeEnv } from './config';

export const app = express();


const util = require('util')
const assert = require('assert');
var port = process.env.PORT || 8080;

var MongoClient = require("mongodb").MongoClient;

var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();

var services = appenv.services;

var mongodb_services = services["compose-for-mongodb"];

assert(!util.isUndefined(mongodb_services), "Must be bound to compose-for-mongodb services");

var credentials = mongodb_services[0].credentials;

var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];

var mongodb;

/*

for testing. was unable to get it working with bluemix

if (nodeEnv == 'test') {
  //use mockgoose for testing
  var mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(credentials.uri, {
      mongos: {
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        poolSize: 1,
        reconnectTries: 1
      }
    },
      function (err, db) {
        console.log("something went wrong", err);
      }
    );
  });
}
else {
  //use real deal for everything else
  mongoose.connect(credentials.uri, {
    mongos: {
      ssl: true,
      sslValidate: true,
      sslCA: ca,
      poolSize: 1,
      reconnectTries: 1
    }
  },
    function (err, db) {
      console.log("something went wrong", err);
    }
  );
}
*/
mongoose.connect(credentials.uri, {
  mongos: {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    poolSize: 1,
    reconnectTries: 1
  }
},
  function (err, db) {
    console.log("something went wrong", err);
  }
);

mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/posts', postsRouter);
app.use('/api/posts', commentsRouter);

app.use(express.static(__dirname + '/public'));

loadPosts();

app.listen(port);

require("cf-deployment-tracker-client").track();
