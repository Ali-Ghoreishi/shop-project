const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotEnv =  require('dotenv');
const logger = require('debug')('shop-project');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const connectDB =  require('./config/db');

const app = express()

//* Load Config
dotEnv.config({path: './config/config.env'})

//* Database Connection
connectDB();
logger("Connected to Database")

//* Passport Configuration
require('./config/passport');

//* BodyParser
app.use(express.urlencoded({extended:false}))

//* Session
app.use(session({
    secret: 'secret',
     cookie: { maxAge: 432000000 },    // 5 day
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }) ,   //save all sessions in Database
}))

//* Passport
app.use(passport.initialize())
app.use(passport.session())

//* Flash
app.use(flash()) //req.flash

//* View Engine
app.use(expressLayout)
app.set('views', 'views')
app.set('view engine', 'ejs')
app.set('layout', './layouts/mainLayout')


//* Static Folder
app.use(express.static(path.join(__dirname ,'public')))
app.use(express.static(path.join(__dirname ,'node_modules')))

//* Locals(variables accessible in templates)
app.use(function(req, res, next){
    res.locals.session = req.session
    next()
})


//* Routes
app.use(require('./routes/user'))


const PORT = process.env.PORT || 3000; 
app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))