const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Items = require('../model/Item');

const itemRouter = express.Router();

itemRouter.use(bodyParser.json());

itemRouter.route('/')
.get((req, res, next) => {
  Items.find({})
  .then((items) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(items);
  }, (err) => next(err))
  .catch((err) => next(err)); 
})

.post((req, res, next) => {
  const newItem = new Items({
    name: req.body.name
  })
  newItem.save()
  .then((items) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(items);
  }, (err) => next(err))
  .catch((err) => next(err)); 
})
.delete((req, res, next) => {
  Items.remove()
  .then(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({sucess: true});
  }, (err) => next(err))
  .catch((err) => next(err)); 
});

itemRouter.route('/:itemId')
.delete((req, res, next) => {
  Items.findByIdAndRemove(req.params.itemId)
  .then(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({sucess: true});
  }, (err) => next(err))
  .catch((err) => next(err)); 
});

module.exports = itemRouter;