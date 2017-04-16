import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import { router } from './router';

const app = express();
app.use(logger('short'));
app.use(router);
mongoose.connect(process.env.DB_URL, connectionHandler);
app.listen(process.env.PORT || 8080);

function connectionHandler(err): void {
  if (err) return console.error(err);
  console.log('Connected to the DB.');
}