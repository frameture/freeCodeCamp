import * as mongoose from 'mongoose';

export let Entry: mongoose.Model<mongoose.Document>;

const entrySchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortcut: { type: Number, unique: true, required: true }
});

Entry = mongoose.model('Entry', entrySchema);

