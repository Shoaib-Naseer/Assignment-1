var express = require('express');
const Feedback = require('../models/Feedback');
//import express  from'express';
var router = express.Router();
//import Packages from '../Models/Package.js'
var Packages = require('../models/Packages');
//import Service from '../Models/Service.js'
var Service = require('../models/Service');

router.get('/', (req, res) => {
  res.send('Packages Dashboard');
});

//adding a single package
router.post('/addpackage', async (req, res) => {
  try {
    const { name, description } = req.body;
    const package = new Packages({ name, description });
    const result = await package.save();
    res.status(201).json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: err,
    });
  }
});

// adding a feedback to Package
router.put('/:id/addfeedback', async (req, res, next) => {
  const package = await Packages.findById(req.params.id);
  const feedback = await Feedback.findById(req.body.id);
  if (!package) {
    return res.status(400).json('package not found with given id');
  }
  if (!feedback) {
    return res.status(400).json('feedback not found with Given Id');
  }
  package.feedbacks.push(feedback);
  await package.save();
  res.status(201).json(package);
});

//Edit a Package
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  const id = req.params.id;
  const packageid = Packages.findById(id);
  if (!packageid) {
    res.status(400).json({
      success: false,
      message: 'Package Doesnt Exist',
    });
  }
  try {
    const package = await Packages.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    res.status(201).json({
      success: true,
      package,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

//Delete a single package

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const package = Packages.findById({ _id: id });
  if (!package) {
    res.status(400).json({
      success: false,
      message: 'Package Doesnt Exist',
    });
  } else {
    try {
      await Packages.remove({ _id: id });
      res.status(201).json({
        success: true,
        message: 'Successfully Deleted',
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
});

// Get single package
router.get('/:id', async (req, res) => {
  const package = await Packages.findById(req.params.id).populate('feedbacks');
  if (!package) {
    return res.status(400).json('Not Found Any Package');
  }
  res.status(200).json({
    success: true,
    package,
  });
});

// Get all packages
router.get('/allpackages', async (req, res) => {
  const packages = await Packages.find().populate('feedbacks');
  res.status(200).json({
    success: true,
    packages,
  });
});

// DElete all packages
router.delete('/allpackages', async (req, res) => {
  await Packages.deleteMany();
  res.status(200).json({
    success: true,
    message: 'successfully deleted',
  });
});

module.exports = router;
