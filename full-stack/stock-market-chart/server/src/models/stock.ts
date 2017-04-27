import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export let Stock: Model<Document>;

const schema = new Schema({
  name: { type: String, required: true, unique: true }
});

Stock = mongoose.model('Stock', schema);
