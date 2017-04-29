import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export let User: Model<Document>;

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  books: [ String ],
  incomingRequests: [ String ],
  outgoingRequests: [ String ]
});

// schema.pre('save', parallel, fn, errorCb)

User = mongoose.model('User', schema, 'users');
