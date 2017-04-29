import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export let Book: Model<Document>;

const schema = new Schema({
  name: String,
  owner: String
});

Book = mongoose.model('Book', schema, 'books');
