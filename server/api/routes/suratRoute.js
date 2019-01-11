'use strict';
var tokenController = require('../controllers/tokenController');
var suratCtrl = require('../controllers/suratController');

module.exports = function(app) {
    app.route('/surat/aktif')
        .get(tokenController, suratCtrl.aktif);
    app.route('/surat/detail')
        .post(tokenController, suratCtrl.suratDetail);
    app.route('/surat/aktif/form')
        .get(tokenController, suratCtrl.aktifForm);
    app.route('/surat/aktif/post')
        .post(tokenController, suratCtrl.createAktif);
    app.route('/surat/pdf')
        .post(tokenController, suratCtrl.printPdf);
    app.route('/surat/dataKuliah')
        .post(tokenController, suratCtrl.createDataKuliah);
    app.route('/surat/dataAkhir')
        .post(tokenController, suratCtrl.createDataAkhir);
};