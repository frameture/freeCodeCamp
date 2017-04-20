import * as mongoose from 'mongoose';

export let UserModel: mongoose.Model<mongoose.Document>;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.checkPassword = function (guess: string) {
  return guess === this.password;
}

UserModel = mongoose.model('User', userSchema, 'users');
