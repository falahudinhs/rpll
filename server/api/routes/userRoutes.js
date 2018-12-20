'use strict';
var tokenController = require('../controllers/tokenController');

module.exports = function(app) {
    var userCtrl = require('../controllers/userController');

    app.route('/users/mahasiswa')
        .post(userCtrl.create_mahasiswa);

    app.route('/users/petugas')
        .post(userCtrl.create_petugas);

    app.route('/users/status')
        .get(tokenController, userCtrl.get_user_waiting);

    app.route('/users/delete/:idUser')
        .delete(tokenController, userCtrl.delete_user);

    app.route('/users/edit')
        .patch(tokenController, userCtrl.edit_user_status);

    app.route('/users/login')
        .post(userCtrl.login_user);

    app.route('/users/mahasiswa')
        .get(tokenController, userCtrl.get_mahasiswa);

    app.route('/users/petugas')
        .get(tokenController, userCtrl.get_petugas);

    app.route('/users/password')
        .patch(tokenController, userCtrl.change_password);
};