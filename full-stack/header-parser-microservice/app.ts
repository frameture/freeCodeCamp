import * as express from 'express';
import * as logger from 'morgan';

const app = express();

app.use(logger('short'));
app.get('/', requestHandler);
app.listen(process.env.PORT || 8080);

function requestHandler(req: express.Request, res): void {
  console.log('headers', req.headers);
  res.json({ message: 'not yet' });
}