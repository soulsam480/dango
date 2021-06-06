import express from 'express';
import { createController, createExpressServer } from 'dango-core';
const app = express();
interface User {
  name: string;
}
createExpressServer(app, {
  prefix: '/api',
  controllers: [
    'controllers/*.ts',
    createController('/m', [
      {
        path: '/',
        method: 'get',
        handler: (req, res, body: User, params, queries) => {
          res.send('m');
        },
      },
    ]),
  ],
  middlewares: [
    (req, res, next) => {
      console.log('global');
      next();
    },
  ],
});

console.log(app._router);
app.listen(4000, () => console.log('http://localhost:4000'));
