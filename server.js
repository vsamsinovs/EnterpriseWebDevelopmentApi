/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// First add the obligatory web framework
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postsRouter from './public/api/posts/posts.api';
import commentsRouter from './public/api/comments/comment.api';

import bodyParser from 'body-parser';

import { loadPosts } from './postData';

import Post from './public/api/posts/post.schema'

import { Mockgoose } from 'mockgoose';
import { nodeEnv } from './config';

export const app = express();


// Util is handy to have around, so thats why that's here.
const util = require('util')
// and so is assert
const assert = require('assert');

// We want to extract the port to publish our app on
var port = process.env.PORT || 8080;

// Then we'll pull in the database client library
var MongoClient = require("mongodb").MongoClient;

// Now lets get cfenv and ask it to parse the environment variable
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();

// Within the application environment (appenv) there's a services object
var services = appenv.services;

// The services object is a map named by service so we extract the one for MongoDB
var mongodb_services = services["compose-for-mongodb"];

// This check ensures there is a services for MongoDB databases
assert(!util.isUndefined(mongodb_services), "Must be bound to compose-for-mongodb services");

// We now take the first bound MongoDB service and extract it's credentials object
var credentials = mongodb_services[0].credentials;

// Within the credentials, an entry ca_certificate_base64 contains the SSL pinning key
// We convert that from a string into a Buffer entry in an array which we use when
// connecting.
var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];

// This is a global variable we'll use for handing the MongoDB client around
var mongodb;

// This is the MongoDB connection. From the application environment, we got the
// credentials and the credentials contain a URI for the database. Here, we
// connect to that URI, and also pass a number of SSL settings to the
// call. Among those SSL settings is the SSL CA, into which we pass the array
// wrapped and now decoded ca_certificate_base64,


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

// With the database going to be open as some point in the future, we can
// now set up our web server. First up we set it to server static pages
app.use(express.static(__dirname + '/public'));

//Add a post
app.post('/api/hello', (req, res) => {
  let newPost = req.body;
  return res.status(201).send({
    uri: credentials.uri,
    test: "hello world",
    port: port,
    bb: newPost
  });
  /*
    if (newPost) {
      Post.create(newPost, (err, post) => {
        if (err) {
          return handleError(res, err);
        }
        return res.status(201).send(post);
      });
    } else {
      return handleError(res, err);
    }
    */
});

loadPosts();


/*
// Add words to the database
app.put("/words", function (request, response) {
  mongodb.collection("words").insertOne({
    word: request.body.word, definition: request.body.definition
  }, function (error, result) {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(result);
    }
  });
});



// Then we create a route to handle our example database call
app.get("/words", function (request, response) {
  // and we call on the connection to return us all the documents in the
  // words collection.
  mongodb.collection("words").find().toArray(function (err, words) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.send(words);
    }
  });
});
*/
// Now we go and listen for a connection.
app.listen(port);


require("cf-deployment-tracker-client").track();
