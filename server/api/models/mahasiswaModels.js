'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userModels');

var Mahasiswa = new Schema({
    nim: String,
    angkatan: String
});

module.exports = User.discriminator('mahasiswa', Mahasiswa);