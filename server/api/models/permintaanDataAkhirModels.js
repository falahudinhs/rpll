'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Surat = require('./suratModel');

var DataAkhir = new Schema({
    instansiTujuan: {
        type: String,
        required: true
    },
    alamatInstansi: {
        type: String,
        required: true
    },
    topikSkripsi: {
        type: String,
        required: true
    },
    tujuanPermintaan: {
        type: String,
        required: true
    },
    pembimbing: {
        type: String,
        required: true
    }
});

module.exports = Surat.discriminator('data tugas akhir', DataAkhir);