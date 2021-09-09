import { createController, createRoute } from 'dango-core';

const home = createRoute<{ user: string }>('/')
  .method('get')
  .handler(({ res }) => res.send('OK'));

const office = createRoute<{ user: string }>({
  path: '/office',
  method: 'get',
  handler: ({ res }) => {
    res.sendError('BadRequest', 'LOL');
  },
});

export default createController('/home', [home, office]);
