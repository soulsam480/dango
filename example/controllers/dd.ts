import { createController } from 'dango-core';

export default createController('/main', [
  {
    path: '/',
    method: 'get',
    handler: (req, res) => {
      res.send('is main working ?');
    },
  },
  {
    path: '/:main',
    method: 'get',
    handler: (req, res, params) => {
      console.log(params);

      res.json(params);
    },
  },
]);
