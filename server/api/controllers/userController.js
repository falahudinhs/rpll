// Load required packages
var express = require('express');
var app = express();
var User = require('../models/userModels');
var Mahasiswa = require('../models/mahasiswaModels');
var Petugas = require('../models/petugasModels');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

// Create endpoint /api/users for POST
//Show signup form
exports.createForm = function(req, res) {
  res.render('index');
};

exports.loginForm = function(req, res) {
  var token = req.cookies.auth;
  if(token){
    jwt.verify(token, 'secretkey', function(err, decoded) {
      if(err) return res.render('login-user');
      return res.redirect('/home')
    });
  }
  else return res.render('login-user');
};

exports.home = function(req, res) {
  if (req.userData.role=='mahasiswa') res.render('home-user');
  else if (req.userData.role=='petugas') res.render('home-petugas');
};

exports.create_mahasiswa = function(req, res) {
  var user = new Mahasiswa(req.body);

  user.save(function(err) {
    if (err){
      return res.status(409).json(err);
    };
    res.render('login-user');
  });
};

exports.create_petugas = function(req, res) {
  var user = new Petugas(req.body);

  user.save(function(err) {
    if (err){
      return res.status(409).json(err);
    };
    return res.json('Petugas created');
  });
};

exports.login_user = function(req, res) {
  User.findOne({ username: req.body.username })
  .exec()
  .then(user =>
  {
    
    if (!user) 
    {
      // return res.status(401).json('user not found');
      return res.render('login-user', {error: 'user not found'})
    }
    user.verifyPassword(req.body.password, function(err, isMatch) {
      if (err) { 
        // return res.status(401).json(err) 
        return res.render('login-user', {error: err})
      }

      // Password did not match
      if (!isMatch) { 
        // return res.status(401).json('wrong password') 
        return res.render('login-user', {error: 'wrong password'})
      }
      
      // Success
      var token = jwt.sign({
        userId: user._id,
        username: user.username,
        role: user.role
      }, 
      'secretkey',
      {
        expiresIn: "12h"
      });
      res.cookie('auth', token);
      return res.redirect('/home');
    });
  })
}

exports.delete_user = function(req, res){
  User.findOneAndRemove(
    {_id: req.params.idUser, status: 'waiting'}
  )
  .exec()
  .then(result => {
    if (result) res.status(200).json({result, message: 'user deleted'});
    else res.status(401).json('user not found')
  })
}

exports.change_password = function(req, res) {
  User.findOne({ username: req.userData.username })
  .exec()
  .then(user =>
  {
    if (!user) 
    {
      return res.status(401).json('user not found');
    }
    user.verifyPassword(req.body.old_password, function(err, isMatch) {
      if (err) { return res.status(401).json(err) }

      // Password did not match
      if (!isMatch) { return res.status(401).json('wrong password') }

      bcrypt.genSalt(5, function(err, salt) {
        if (err) return res.json(err)
    
        bcrypt.hash(req.body.new_password, salt, null, function(err, hash) {
          if (err) return res.json(err)

          User.findOneAndUpdate(
            {username: req.userData.username}, { $set: { password: hash }}
          )
          .exec()
            .then(result => {
                res.status(200).json({
                    result,
                    message: "Password updated",
                    request: {
                        type: "PATCH"
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })
        });
      });

      
    });
  })
}

// Create endpoint /api/users for GET
exports.get_mahasiswa = function(req, res) {
    User.findById(req.userData.userId, '_id username nama email telepon nim angkatan')
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
}; 

exports.get_petugas = function(req, res) {
  User.findById(req.userData.userId, '_id username nama email telepon')
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  })
}; 