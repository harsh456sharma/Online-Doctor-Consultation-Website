const express = require('express');
const User = require('../models/patient');
const router = express.Router();

router.get('/profile', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('profile', { users: users });
    } catch (err) {
        console.log(err);
        res.send('Error retrieving profiles.');
    }
});

router.post('/profile', async (req, res) => {
    const { email, name, age } = req.body;

    try {
        await User.updateOne({ email: email }, { name: name, age: age });
        res.redirect('/profile');
    } catch (err) {
        console.error(err);  
        res.status(500).send('An error occurred while updating the user.');
    }
});

router.post('/delete', async (req, res) => {
    const { email } = req.body;

    try {
        await User.deleteOne({ email: email });
        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        res.send('Error deleting user.');
    }
});

router.get('/edit/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const foundUser = await User.findOne({ email: email });
        if (foundUser) {
            res.render('edit', { user: foundUser });
        } else {
            res.send('User not found.');
        }
    } catch (err) {
        console.log(err);
        res.send('Error retrieving user.');
    }
});

router.post('/edit', async (req, res) => {
    const { email, name, age } = req.body;

    try {
        await User.updateOne({ email: email }, { name: name, age: age });
        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        res.send('Error updating user.');
    }
});

module.exports = router;
