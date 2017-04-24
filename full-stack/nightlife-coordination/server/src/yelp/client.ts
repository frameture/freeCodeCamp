import * as yelp from 'yelp-fusion';

// TODO: in production - use process.env
import { YELP_APP_ID, YELP_APP_SECRET } from '../../.env';

export let yelpClient;

yelp.accessToken(YELP_APP_ID, YELP_APP_SECRET)
  .then(res => yelpClient = yelp.client(res.jsonBody.access_token))
  .catch(e => console.error(e));
