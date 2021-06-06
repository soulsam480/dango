import { createController } from 'dango-core';

export default createController('/ddd', [
  {
    path: '/',
    method: 'get',
    handler: (req, res) => {
      res.send('ddd');
    },
  },
]);
