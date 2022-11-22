// Emaan Amjad
const express = require('express');

const UserModel = require('../models/UserModel');
const BookServicesModel = require('../models/BookServicesModel');

const router = express.Router();
router.post('/adduser', function (req, res, next) {
  UserModel.create(req.body)
    .then(
      (adduser) => {
        res.statusCode = 200;
        console.log('User is added:', adduser);
        res.setHeader('Content-Type', 'application/json');
        res.json(adduser);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
// user create a service
router.post('/bookservice', function (req, res, next) {
  BookServicesModel.create(req.body)
    .then(
      (result) => {
        console.log('Services has been Added ', result);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

//assign multiple services to user
router.put('/assign/:uid/services/:sid', function (req, res, next) {
  console.log(req.params.uid);
  BookServicesModel.findOneAndUpdate(
    { uid: req.params.uid },
    {
      $push: {
        services: {
          sid: req.params.sid,
        },
      },
    },
    { new: true, upsert: false },
    function (error, results) {
      if (error) {
        return next(error);
      }
      // Respond with valid data
      res.json(results);
    }
  );
});

router.get('/getbookedservice', function (req, res, next) {
  BookServicesModel.find()
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

module.exports = router;
