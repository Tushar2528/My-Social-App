// import * as connectMongo from 'connect-mongo';

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// **************************

// ********************
var bodyParser = require('body-parser');

// used for session cookie  
const session = require('express-session');
const passport = require('passport');
const  passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');




app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));



app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//Setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name : 'codeial',

    // TODO change the secret before deployment in production mode

    secret : 'qwerty',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },

    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017",
        autoRemove: "disabled",
      }),
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});
