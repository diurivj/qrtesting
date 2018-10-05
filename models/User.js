const Schema = require('mongoose').Schema;

const userSchema = new Schema({
  username: String,
  role: String,
  occupation: String,
  image: String,
  telephone: String,
  QR: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, 
  versionKey: false
});

module.exports = require('mongoose').model('User', userSchema);