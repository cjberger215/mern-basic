import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

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
  password: {
    type: String,
    minlength: 6,
    required: 'Password is required',
  },
  salt: String,
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

UserSchema.methods = {
  authenticate(plaintext, cb) {
    return bcrypt.compare(plaintext, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  },
};

export default mongoose.model('User', UserSchema);
