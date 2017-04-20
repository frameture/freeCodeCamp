import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import { router } from './routes'

import { DB_URI } from './.env';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(router);

mongoose.connect(process.env.DB_URI || DB_URI);
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connected to the DB'));

app.listen(process.env.PORT || 8080, () => console.log('Started.'));
