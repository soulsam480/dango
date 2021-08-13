import { createController, createRoute } from 'dango-core';

const someRoute = createRoute<{ user: string }>({
  path: '/',
  method: 'get',
  handler: (req, res, body) => {
    res.send('OK');
  },
});

export default createController('/home', [someRoute]);
