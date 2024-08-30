// routes/appointments.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');

// @route   GET /
// @desc    Render appointment form
router.get('/', (req, res) => {
  res.render('appointment', { formData: {} });  // Pass empty formData by default
});
// @route   POST /appointments
// @desc    Create a new appointment
router.post(
  '/appointments', 
  [
    body('department').notEmpty().withMessage('Department is required'),
    body('doctor').notEmpty().withMessage('Doctor is required'),
    body('patientName').notEmpty().withMessage('Name is required'),
    body('patientEmail').isEmail().withMessage('Valid email is required'),
    body('patientPhone').isMobilePhone().withMessage('Valid Phone is required'),
    body('appointmentDate').notEmpty().withMessage('Date is required'),
    body('appointmentTime').notEmpty().withMessage('Time is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('appointment', { errors: errors.array(), formData: req.body });
    }

    const { department, doctor, patientName, patientEmail,patientPhone, appointmentDate, appointmentTime } = req.body;

    try {
      const newAppointment = new Appointment({
        department,
        doctor,
        patientName,
        patientEmail,
        patientPhone,
        appointmentDate,
        appointmentTime,
      });

      await newAppointment.save();
      res.redirect('/appointment/dashboard');
    } catch (err) {
      console.error(err);
      res.render('appointment', { errors: [{ msg: 'Server Error' }], formData: req.body });
    }
  }
);

// @route   GET /dashboard
// @desc    View all appointments


router.get('/dashboard', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1, appointmentTime: 1 });
    // console.log('Appointments:', appointments);
    res.render('dashboard', { appointments });
 // appointments is passed here
  } catch (err) {
    console.error(err);
    res.send('Server Error');
  }
});

module.exports = router;
