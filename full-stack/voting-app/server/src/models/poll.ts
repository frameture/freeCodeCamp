import * as mongoose from 'mongoose';

export let PollModel: mongoose.Model<mongoose.Document>;

const pollSchema = new mongoose.Schema({
  username: { type: String, required: true },
  pollName: { type: String, required: true },
  options: { type: [ String ] }
});

PollModel = mongoose.model('Poll', pollSchema, 'polls');
