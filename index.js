const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const os = require('os')

const dotenv = require('dotenv');
const moment = require('moment');
const enforce = require('express-sslify');


const system = os.platform();


if(process.env.NODE_ENV != 'production'){
  //console.log('NODE_ENV === DEVELOPMENT')
  let result = dotenv.config();

  // console.log(process.env)
  if(result.error){
    throw result.error
  }
}

  console.log('Using Production Data Set')

  mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${encodeURIComponent(process.env.ATLAS_PASSWORD)}${process.env.ATLAS_URL}`
  );


mongoose.Promise = global.Promise;
var db = mongoose.connection;

mongoose.connection.on('connected',()=>{
  console.log('info', 'Connected to Atlas');
});

mongoose.connection.on('error', function(err){
  console.log('error', 'Error Connecting to Atlas', err);
});




// Init App
var app = express();
app.use(cors());

//Force SSL -> PRODUCTION ONLY
if(process.env.NODE_ENV === 'production'){
  console.log('using HTTPS')
app.use(enforce.HTTPS({trustProtoHeader: true}))
}

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs(
  {
   extname: '.hbs',
   defaultLayout:'layout',
   partialsDir: path.join(__dirname, 'views/partials'),
  }
));

app.set('view engine', '.hbs');

// BodyParser Middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb',parameterLimit: 10000 }));
app.use(cookieParser());



// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/serviceWorkerMobile',express.static(path.join(__dirname, '/public/serviceWorkerMobile'),{  maxAge:0, }))
// Express Session
app.use(session({
    secret: 'secret',
    store: new MongoStore({mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use(function (error, req, res, next) {

  res.locals.error=err; //get error thrown from another-route above
  console.log(res.locals)
  res.render("error-page");
});



const general_routes = require('./routes/router');
app.use('/', general_routes);


// Set Port
app.set('port', (process.env.PORT || 2000));


app.listen(app.get('port'), function(){
  console.log('info', 'Server started on ' + app.get('port'))
	//console.log('Server started on port '+app.get('port'));
});
