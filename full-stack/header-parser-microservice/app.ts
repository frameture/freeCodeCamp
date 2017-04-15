import * as express from 'express';
import * as logger from 'morgan';

const app = express();

app.use(logger('short'));
app.get('/', requestHandler);
app.listen(process.env.PORT || 8080);

function requestHandler(req: express.Request, res): void {
  const ip = getIp(req);
  const os = getOs(req);
  const language = getLang(req);

  res.json({ ip, language, os });
}

function getIp(req): string {
  return req.ip.substring(req.ip.lastIndexOf(':') + 1);
}

function getOs(req): string {
  const ua = req.headers[ 'user-agent' ];
  return ua.substring(ua.indexOf('(') + 1, ua.lastIndexOf(')'));
}

function getLang(req): string {
  const al = req.headers[ 'accept-language' ];
  return al.substring(0, al.indexOf(','));
}
