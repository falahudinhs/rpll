'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Surat = require('./suratModel');

var DataKuliah = new Schema({
    instansiTujuan: {
        type: String,
        required: true
    },
    alamatInstansi: {
        type: String,
        required: true
    },
    mataKuliah: {
        type: String,
        required: true
    },
    tujuanPermintaan: {
        type: String,
        required: true
    },
    dosenPengajar: {
        type: String,
        required: true
    }
});

module.exports = Surat.discriminator('data tugas kuliah', DataKuliah);