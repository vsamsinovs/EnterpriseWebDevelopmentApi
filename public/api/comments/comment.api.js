import express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';
import Comment from './comment.schema';

const router = express.Router();

router.get('/:id/comments', (req, res) => {
  let postId = req.params.id;
  Comment.find((err, items) => {
    if (err) { return handleError(res, err); }

    var postComments = items.filter(post => post.postId == postId);

    return res.send(postComments);
  });
});

router.post('/:id/comments', (req, res) => {
  let newComment = req.body;
  if (newComment) {
    Comment.create(newComment, (err, comment) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(201).send(comment);
    });
  } else {
    return handleError(res, err);
  }
});

router.get('/comments', (req, res) => {
  Comment.find((err, items) => {
    if (err) { return handleError(res, err); }
    return res.send(items);
  });
});

function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;
