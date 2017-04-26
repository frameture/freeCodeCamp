import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export let Venue: Model<Document>;

const schema = new Schema({
  venueId: { type: String, required: true, unique: true },
  going: { type: [ String ] }
});

Venue = mongoose.model('Venue', schema, 'venues');
