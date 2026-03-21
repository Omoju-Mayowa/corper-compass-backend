import mongoose from 'mongoose';
import argon2 from 'argon2';

import pLimit from 'p-limit'

const hashLimit = pLimit(4)

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

const hashOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 1, // keep this
};

userSchema.pre('save', async function (next) { // next back in params
  if (!this.isModified('password')) return next();
  try {
    this.password = await hashLimit(() => argon2.hash(this.password, hashOptions));
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await hashLimit(() => argon2.verify(this.password, enteredPassword));
  } catch {
    return false; // safe fallback
  }
};

const User = mongoose.model('User', userSchema);
export default User;
