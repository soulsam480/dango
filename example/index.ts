import express from 'express';
import { createController, createExpressServer } from 'dango-core';
const app = express();

createExpressServer(app, {
  prefix: '/api',
  controllers: [
    'controllers/*.ts',
    createController('/m', [
      {
        path: '/',
        method: 'get',
        handler: ({ res }) => {
          res.send('m');
        },
      },
    ]),
  ],
  middlewares: [
    (_, __, next) => {
      console.log('global');
      next();
    },
  ],
});

console.log(app._router);
app.listen(4000, () => console.log('http://localhost:4000'));
