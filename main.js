const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/patient');
const profileRoutes = require('./routes/profile');
const appointmentRoutes = require('./routes/appointments');
const doctorform = require('./routes/doctorform');
const app = express();


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(session({
    secret: 'sdgsdgsdfher',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Routes
app.use('/', authRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/', profileRoutes);
app.use('/api/auth',doctorform);

const dashboardRoutes = require('./routes/dashboard'); 
app.use('/', dashboardRoutes);
app.get('/', (req, res) => {
    res.render('2home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.get('/loginindex', (req, res) => {
    res.render('loginindex');
});

app.get('/loginpatient', (req, res) => {
    res.render('loginpatient');
});

app.get('/patientsignup', (req, res) => {
    res.render('patientsignup');
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.get('/service', (req, res) => {
    res.render('service');
});

app.get('/team', (req, res) => {
    res.render('team');
});
app.get('/doctorregister', (req, res) => {
    res.render('doctorregister');
});

app.get('/doctorlogin', (req, res) => {
    res.render('doctorlogin');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server strated at http://localhost:${PORT}`));
