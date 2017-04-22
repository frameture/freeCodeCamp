import * as mongoose from 'mongoose';

export let PollModel: mongoose.Model<mongoose.Document>;

const voteSchema = new mongoose.Schema({
  option: { type: String, required: true },
  postedBy: { type: String, required: true },
  username: { types: String },
  ip: { type: String }
});

const pollSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  options: { type: [ String ] },
  votes: { type: [ voteSchema ] }
});

pollSchema.methods.addVote = function (data, ip?: string): boolean {
  let vote;
  for (let i = 0; i < this.votes.length; i++) {
    vote = this.votes[ i ];
    if (data.postedBy === 'username' && vote.postedBy === 'username' &&
        data.username === this.username) { return false; }
    if (data.postedBy === 'ip' && vote.postedBy === 'ip' &&
        ip === vote.ip) { return false; }
  }

  this.votes.push({
    option: data.option,
    postedBy: data.postedBy,
    username: data.username,
    ip: ip
  });
  this.save((err) => { if (err) { return console.error(err); } });
  
  return true;
}

PollModel = mongoose.model('Poll', pollSchema, 'polls');
