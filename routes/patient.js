const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/patient');
const router = express.Router();
const saltRounds = 10;

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { email, password, name, age } = req.body;

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name: name,
            email: email,
            password: hash,
            age: age,
        });

        await newUser.save();
        res.redirect('/loginpatient');
    } catch (err) {
        console.log(err);
        res.send('Error saving user.');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email: email });

        if (foundUser) {
            const match = await bcrypt.compare(password, foundUser.password);
            if (match) {
                res.render('home', { user: foundUser });
            } else {
                res.send('Incorrect password.');
            }
        } else {
            res.send('No user found with that email.');
        }
    } catch (err) {
        console.log(err);
        res.send('Error logging in.');
    }
});

module.exports = router;
