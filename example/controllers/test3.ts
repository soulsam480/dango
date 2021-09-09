import { createController } from 'dango-core';

export default createController('/main', [
  {
    path: '/',
    method: 'get',
    handler: ({ res }) => {
      res.send('is main working ?');
    },
  },
  {
    path: '/:main',
    method: 'get',
    handler: ({ res, params }) => {
      console.log(params);

      res.json(params);
    },
  },
]);
