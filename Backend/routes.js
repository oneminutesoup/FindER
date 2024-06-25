const express = require('express');
const HospitalController = require('./Controller/hospitalController');
const router = express.Router();

// Define your routes
router.get('/hospitals', (req, res) => {
    console.log("hospitals/");
    return res.json({ body: HospitalController.getHospitals() });
});

router.post('/hospitals/recommend', async (req, res) => {
    console.log("hospitals/recommend");
    return res.json({ body: await HospitalController.getRecommendation(req) });
});

// Define your routes
router.get('/users', (req, res) => {
  // Handle GET request for users
  res.json({ message: 'Get all users' });
});

router.post('/users', (req, res) => {
  // Handle POST request for users
  res.json({ message: 'Create a user' });
});

module.exports = router;