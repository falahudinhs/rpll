var mongoose = require('mongoose');

var userOptions = {
  discriminatorKey: 'jenis',
  collections: 'surats',
};

// Define our user schema
var SuratSchema= new mongoose.Schema({
  no: {
    type: String,
    unique: true,
    required: true,
    sparse: true
  },
  nama: {
    type: String
  },
  idMahasiswa: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: string,
    default: 'pending'
  },
  tanggalDiajukan:{
    type: Date
  },
  tanggalSelesai:{
    type: Date
  }
}, userOptions,
);

// Export the Mongoose model
module.exports = mongoose.model('Surat', SuratSchema);