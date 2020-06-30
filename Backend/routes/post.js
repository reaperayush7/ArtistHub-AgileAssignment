const express = require('express');
var Post = require('../models/post');
var verify = require('../verify');

const router = express.Router();

//CRUD functions of models data here....
router.route('/')
.get((req, res, next) => {

    console.log(req.user.id);
    Post.find({})
        .then((userposts) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(userposts);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {

    req.body.userid=req.user.id;
//    res.send(req.body);
Post.create(req.body)
        .then((userpost) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(userpost);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported!');
})
.put((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
        .then((userpost) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(userpost);
        }, (err) => next(err))
        .catch((err) => next(err));
})