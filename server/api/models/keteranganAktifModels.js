'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Surat = require('./suratModel');

var Aktif = new Schema({
    tujuanPembuatan: String
});

module.exports = Surat.discriminator('keterangan aktif', Aktif);