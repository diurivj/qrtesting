const router = require('express').Router();
const User   = require('../models/User');
const QRCode = require('qrcode');

router.get('/signup', (req, res, next) => {
  res.render('signup')
})

router.post('/signup', (req, res, next) => {
  User.create({...req.body})
  .then(user => {
    let {_id} = user
    link = `https://${req.headers.host}/profile/${_id}`
    QRCode.toDataURL(link, (err, url) => {
      if (err) throw err;
      User.findByIdAndUpdate(_id, {QR: url}, {new: true}).then(user => {console.log(user); return res.redirect('/display_qr')}).catch(err => console.log(err))
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/display_qr', (req, res, next) => {
  User.find({}, {_id: 0, username: 1, QR: 1})
  .then(user => {
    console.log(user);
    res.render('displayqr', {user})
  })
  .catch(err => console.log(err))
})

router.get('/profile/:_id', (req, res, next) => {
  User.findById(req.params._id)
  .then(user => {
    res.render('profile', {user})
  })
})

module.exports = router;