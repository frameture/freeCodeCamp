import * as mongoose from 'mongoose';

export let UserModel: mongoose.Model<mongoose.Document>;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserModel = mongoose.model('User', userSchema, 'users');
