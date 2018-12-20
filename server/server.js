var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    cors = require('cors');
    bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rpll');

app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(cors());

var userRoutes = require('./api/routes/userRoutes');
var suratRoutes = require('./api/routes/suratRoute')

userRoutes(app); 
suratRoutes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);