import express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';
import Post from './post.schema';
import config from './../../../config';

const router = express.Router();

router.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) { return handleError(res, err); }
    return res.send(posts);
  });
});

router.post('/', (req, res) => {
  let newPost = req.body;
  
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
});

//Update a post
router.put('/:id', (req, res) => {
  let key = req.params.id;
  let updatePost = req.body;

  if (updatePost._id) { delete updatePost._id; }
  Post.findById(req.params.id, (err, post) => {
    if (err) { return handleError(res, err); }
    if (!post) { return res.send(404); }
    const updated = _.merge(post, updatePost);
    updated.save((err) => {
      if (err) { return handleError(res, err); }
      return res.send(post);
    });
  });
});

//Delete a post
router.delete('/:id', (req, res) => {
  let key = req.params.id;
  Post.findById(key, (err, post) => {
    if (err) { return res.status(400).send(err); }
    if (!post) { return res.send(404); }
    post.remove(err => {
      if (err) { return handleError(res, err); }
      return res.send(post);
    });
  });
});

function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;
