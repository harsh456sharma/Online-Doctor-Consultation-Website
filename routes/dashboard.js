// In routes/dashboard.js or auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Appointment = require('../models/Appointment');

router.get('/doctordashboard', async (req, res) => {
  const token = req.session.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Fetch all appointments from the database
    const appointments = await Appointment.find();

    // Render the doctordashboard view with the appointments data
    res.render('doctordashboard', { appointments });
  } catch (error) {
    console.error(error.message);
    res.redirect('/login');
  }
});

module.exports = router;
