'use strict';
var tokenController = require('../controllers/tokenController');
var suratCtrl = require('../controllers/suratController');

module.exports = function(app) {

    app.route('/surat/aktif')
        .post(tokenController, suratCtrl.createAktif);
    app.route('/surat/dataKuliah')
        .post(tokenController, suratCtrl.createDataKuliah);
    app.route('/surat/dataAkhir')
        .post(tokenController, suratCtrl.createDataAkhir);

    app.route('/surat/aktif')
        .get(tokenController, suratCtrl.getSuratAktif);
};