'use strict';
var tokenController = require('../controllers/tokenController');

module.exports = function(app) {
    var userCtrl = require('../controllers/userController');

    app.route('/users/mahasiswa')
        .get(userCtrl.createForm);
    app.route('/users/mahasiswa/post')
        .post(userCtrl.create_mahasiswa);
    app.route('/users/petugas/post')
        .post(userCtrl.create_petugas);
    app.route('/users/delete/:idUser')
        .delete(userCtrl.delete_user);
    app.route('/users/login')
        .get(userCtrl.loginForm);
    app.route('/home')
        .get(tokenController, userCtrl.home);
    app.route('/users/login/post')
        .post(userCtrl.login_user);
    app.route('/users/mahasiswa')
        .get(userCtrl.get_mahasiswa);
    app.route('/users/petugas')
        .get(userCtrl.get_petugas);
    app.route('/users/password')
        .patch(userCtrl.change_password);
};