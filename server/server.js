var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    cors = require('cors');
    bodyParser = require('body-parser')

var cookieParser = require('cookie-parser')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rpll');


app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

var userRoutes = require('./api/routes/userRoutes');
var suratRoutes = require('./api/routes/suratRoute')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views'));
app.use(cookieParser());
userRoutes(app); 
suratRoutes(app);

app.get('/', function(req, res) {
  res.redirect('/users/login');
});

app.listen(port);

console.log('RESTful API server started on: ' + port);