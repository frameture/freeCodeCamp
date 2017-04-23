import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import { router } from './routes'

const app = express();
const publicPath = path.resolve(__dirname, 'public');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('short'));
app.use(express.static(publicPath));
app.use(router);

mongoose.connect(process.env.DB_URI);
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connected to the DB'));

app.listen(process.env.PORT || 8080, () => console.log('Started.'));
