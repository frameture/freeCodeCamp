import * as express from 'express';
import * as logger from 'morgan';
import { router } from './routes';

const app = express();
app.listen(process.env.PORT || 8080, () => console.log('Started.'));

app.use(logger('short'));
app.use(router);