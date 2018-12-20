'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userModels');

var Petugas = new Schema({

});

module.exports = User.discriminator('petugas', Petugas);