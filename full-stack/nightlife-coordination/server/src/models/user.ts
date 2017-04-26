import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export let User: Model<Document>;

const schema = new Schema({
  clientId: { type: String, required: true, unique: true }
});

User = mongoose.model('User', schema);
