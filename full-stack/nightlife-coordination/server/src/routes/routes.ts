import { Router } from 'express';

import { yelpClient } from '../yelp/client';
import { publicPath } from '../app';

export const router = Router();

router.get('/api/search/:location', (req, res) => {
  const searchRequest = {
    location: req.params.location
  };
  
  yelpClient.search(searchRequest)
    .then(data => res.json(data.jsonBody.businesses))
    .catch(e => console.error(e));
});

router.get('/*', (req, res) => {
  res.sendFile(publicPath + '/index.html');
});