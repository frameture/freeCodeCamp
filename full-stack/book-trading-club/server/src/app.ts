import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';

// import { DB_URI } from './env';
import { api } from './routes/api';
import { index } from './routes/index';

export const publicPath = path.resolve(__dirname, 'public');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', api);
app.use(index);

app.use((err, req, res, next) => {
  if (err) {
    res.json(err);
    console.error('ERROR\n ', err);
  }
  next();
});

mongoose.connect(process.env.DB_URI, () => console.log('Connected to the DB'));
app.listen(process.env.PORT || 8080, () => console.log('Started on 8080:'));