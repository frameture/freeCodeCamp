import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';

import { router } from './routes/router';

export const publicPath = path.resolve(__dirname, 'public');

const app = express();
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to the db');
});

app.use(router);
app.listen(process.env.PORT || 8080);
