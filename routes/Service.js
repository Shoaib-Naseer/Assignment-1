var express = require('express');
const Packages = require('../models/Packages');
//import express  from'express';
var router = express.Router();

//import Service from '../Models/Service.js'
var Service = require('../models/Service');

//adding a new Service
router.post('/addservice', function (req, res, next) {
  Service.create(req.body)
    .then(
      (Service) => {
        console.log('Service has been Added ', Service);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Service);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

//Add a Package to a service
router.put('/:id/addpackage', async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  const package = await Packages.findById(req.body.id);
  if (!service) {
    return res.status(400).json('service not found with given id');
  }
  if (!package) {
    return res.status(400).json('Package not found with Given Id');
  }
  service.packages.push(package);
  await service.save();
  res.status(201).json(service);
});

//get all services
router.get('/', function (req, res, next) {
  Service.find()
    .populate('packages')
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    });
});

//Delete a single service
router.delete('/:id', function (req, res, next) {
  Service.deleteOne({ _id: req.params.id }, function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});

//Update a service
router.put('/:id', function (req, res, next) {
  Service.findOneAndUpdate(
    { _id: req.params.id },
    { new: true, upsert: false },
    function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    }
  ).populate('packages');
});

// Emaan Amjad

//Getting a single service
router.get('/:id', function (req, res, next) {
  Service.findById(req.params.id)
    .populate('packages')
    .then(
      (result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

//delete all services
router.delete('/deleteallservices', function (req, res, next) {
  Service.deleteMany({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted : ', result);
    }
  });
});

module.exports = router;
//export default router;
