var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var validatePassword = function(password) {
  var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password)
};

var userOptions = {
  discriminatorKey: 'role',
  collections: 'users',
};

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    sparse: true
  },
  password: {
    type: String,
    required: true,
    validate: [validatePassword, 'Please fill a valid password'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Please fill a valid password']
  },
  nama: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  telepon: {
    type: String
  }
}, userOptions,
);


// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);