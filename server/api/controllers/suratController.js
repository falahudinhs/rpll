// Load required packages
var User = require('../models/userModels');
var Surat = require('../models/suratModel');
var Aktif = require('../models/keteranganAktifModels');
var DataKuliah = require('../models/permintaanDataKuliahModels')
var DataAkhir = require('../models/permintaanDataAkhirModels');
var pdfMake = require('pdfmake');

// Create endpoint /api/users for POST
exports.aktif = function(req, res) {
  var populateQuery = [{path:'idMahasiswa', select:'nama nim semester'}];
  if (req.userData.role=='mahasiswa'){
    Surat.find({jenis: 'keterangan aktif', idMahasiswa: req.userData.userId})
    .populate(populateQuery)
    .sort({tanggalDiajukan: -1})
    .exec()
    .then(result => {
      return res.render('aktif-user', {data: result});
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
  }
  else if (req.userData.role=='petugas'){
    Surat.find({jenis: 'keterangan aktif'})
    .populate(populateQuery)
    .sort({tanggalDiajukan: 1})
    .exec()
    .then(result => {
      return res.render('aktif', {data: result});
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
  } 
};

exports.suratDetail = function(req, res) {
  var populateQuery = [{path:'idMahasiswa', select:'nama nim semester'}];
  console.log('id surat', req.body.suratId)
  Surat.findOne({_id: req.body.suratId})
  .populate(populateQuery)
  .exec()
  .then(result => {
    console.log(result)
    if (result.jenis=='keterangan aktif') return res.render('detail-aktif', {data: result});
    else if (result.jenis=='data kuliah') return res.render('detail-matkul', {data: result});
    else if (result.jenis=='data akhir') return res.render('detail-akhir', {data: result});
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  })
};

exports.printPdf = function(req, res) {
  var content = req.body;
  console.log('ini konten',content)
  pdfMake.createPdf(content).download('pdf aktif', function(err, res){
    if (err) return err;
    return res;
  });
  
};

exports.aktifForm = function(req, res) {
  User.findById(req.userData.userId, '_id username nama email telepon nim semester')
    .exec()
    .then(result => {
      return res.render('form-aktif-user', {data: result});
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    })
};

exports.createAktif = function(req, res) {
  var aktif = new Aktif({
    nomor: 'ILKOM/3142',
    nama: 'Surat Keterangan Aktif',
    idMahasiswa: req.userData.userId,
    tujuanPembuatan: req.body.alasan
  });

  aktif.save(function(err) {
    if (err){
      return res.status(409).json(err);
    };
    return res.redirect('/surat/aktif');
  });
};

exports.createDataKuliah = function(req, res) {
  var data = new DataKuliah({
    nomor: req.body.nomor,
    nama: 'Surat Permintaan Data untuk Tugas Kuliah',
    idMahasiswa: req.body.idMahasiswa,
    tanggalDiajukan: req.body.tanggalDiajukan,
    tanggalSelesai: req.body.tanggalSelesai,
    instansiTujuan: req.body.instansiTujuan,
    alamatInstansi: req.body.alamatInstansi,
    mataKuliah: req.body.mataKuliah,
    tujuanPermintaan: req.body.tujuanPermintaan,
    dosenPengajar: req.body.dosenPengajar
  });

  data.save(function(err) {
    if (err){
      return res.status(409).json(err);
    };
    return res.json('Data kuliah created');
  });
};

exports.createDataAkhir = function(req, res) {
  var data = new DataAkhir({
    nomor: req.body.nomor,
    nama: 'Surat Permintaan Data untuk Tugas Akhir',
    idMahasiswa: req.body.idMahasiswa,
    tanggalDiajukan: req.body.tanggalDiajukan,
    tanggalSelesai: req.body.tanggalSelesai,
    instansiTujuan: req.body.instansiTujuan,
    alamatInstansi: req.body.alamatInstansi,
    topikSkripsi: req.body.topikSkripsi,
    tujuanPermintaan: req.body.tujuanPermintaan,
    pembimbing: req.body.pembimbing
  });

  data.save(function(err) {
    if (err){
      return res.status(409).json(err);
    };
    return res.json('Data akhir created');
  });
};

exports.edit_user_status = function(req, res){
  User.findOneAndUpdate(
    { _id: req.body.idUser }, { $set: { 
      status: 'approved', 
      privilege: req.body.privilege
    }}
  )
  .exec()
    .then(result => {
        res.status(200).json({
            result,
            message: "User updated",
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
}

exports.deleteSurat = function(req, res){
  User.findOneAndRemove(
    {_id: req.params.idSurat}
  )
  .exec()
  .then(result => {
    if (result) res.status(200).json({result, message: 'Surat deleted'});
    else res.status(401).json('Surat not found')
  })
}

exports.get_user_waiting = function(req, res){
  User.find({status: 'waiting'})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
}

// Create endpoint /api/users for GET
exports.getSuratMahasiswa = function(req, res) {
    Surat.findById(req.userData.userId)
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

exports.getSuratAktif = function(req, res) {
  var populateQuery = [{path:'idMahasiswa', select:'nama nim angkatan'}];
  Surat.find({jenis: 'keterangan aktif'})
  .populate(populateQuery)
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

exports.getSuratDataKuliah = function(req, res) {
  Surat.find({jenis: 'data tugas kuliah'})
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

exports.getSuratDataAkhir = function(req, res) {
  Surat.find({jenis: 'data tugas akhir'})
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