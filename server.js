require('dotenv').config();
require('./db/db');
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cors          = require('cors');
const session       = require('express-session');

app.use(session({
    secret: 'roberto roberto',
    resave: false,
    saveUninitialized: false
}));

// bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set the cors options for the stuff
const corsOptions = {
    origin: process.env.CORS_URI,
    credentials: true, // so the session cookie can be sent
    optionsSuccessStatus: 200
}
// tell the app to use it and stuff
app.use(cors(corsOptions));

// controllers set after middleware
const authController        = require('./controllers/authController');
const reservationController = require('./controllers/reservationController');
const reviewController        = require('./controllers/reviewController');

app.use('/auth', authController);
app.use('/api/v1/reservations', reservationController);
app.use('/api/v1/reviews', reviewController);

app.listen(process.env.PORT || 9000, () => {
    console.log('listening on port 9000');
});
