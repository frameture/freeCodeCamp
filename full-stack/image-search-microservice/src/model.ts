import * as mongoose from 'mongoose';

export let Model;

const schema = new mongoose.Schema({
  term: { type: String, required: true },
  when: { type: Date, required: true }
});

Model = mongoose.model('Entry', schema);