const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const apa = req.cookies.auth
    try {
        var token = apa;
        var decode = jwt.verify(token, "secretkey");
        req.userData = decode; //
        next(); // success auth
    } catch (error) {
        return res.redirect('/users/login');
    }
};