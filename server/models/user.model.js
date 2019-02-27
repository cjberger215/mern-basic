import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  password_digest: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.password_digest = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate(plaintext) {
    return bcrypt.compare(plaintext, this.password_digest, (err, res) => res);
  },
  encryptPassword(password) {
    if (!password) return '';
    return bcrypt.hash(password, 10, (err, hash) => hash);
  },
};

UserSchema.path('hashed_password').validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

export default mongoose.model('User', UserSchema);
