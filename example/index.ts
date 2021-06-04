import express from 'express';
import { createExpressServer } from 'dango-core';
const app = express();

createExpressServer(app, {
  controllers: ['controllers/*.ts'],
  middlewares: [
    (req, res, next) => {
      console.log('global');
      next();
    },
  ],
});

console.log(app._router);
app.listen(4000, () => console.log('http://localhost:4000'));
