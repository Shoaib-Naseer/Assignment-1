var express = require('express');
//import express  from'express';
var router = express.Router();
//import feedback from '../Models/Feedback.js'
var Feedback = require('../models/Feedback');
//import feedback from '../Models/feedback.js'
var Feedback = require('../models/Feedback');
const Packages = require('../models/Packages');

router.get('/', (req, res) => {
  res.send('Feedbacks Dashboard');
});

//adding a single feedback
router.post('/addfeedback', async (req, res) => {
  try {
    const { feedback } = req.body;

    const feed = new Feedback({ feedback });
    const result = await feed.save();
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

//update a package
router.put('/:id', async (req, res) => {
  const { feedback_data } = req.body;
  const id = req.params.id;
  const feedbackid = Feedback.findById(id);
  if (!feedbackid) {
    res.status(400).json({
      success: false,
      message: 'Feedback Doesnt Exist',
    });
  }
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { feedback: feedback_data },
      { new: true }
    );

    res.status(201).json({
      success: true,
      feedback,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const feedback = Feedback.findById({ _id: id });
  if (!feedback) {
    res.status(400).json({
      success: false,
      message: 'Feedback Doesnt Exist',
    });
  } else {
    try {
      await Feedback.remove({ _id: id });
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

router.get('/allfeedback', async (req, res) => {
  const feedback = await Feedback.find();
  res.status(200).json({
    success: true,
    feedback,
  });
});

//delete all Feedbacks
router.delete('/allfeedback', async (req, res) => {
  await Feedback.deleteMany();
  res.status(200).json({
    success: true,
    message: 'Successfully Deleted',
  });
});

router.get('/:id', async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    return res.status(400).json('Not found any feedback');
  }
  res.status(200).json({
    success: true,
    feedback,
  });
});

module.exports = router;
