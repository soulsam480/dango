import express from 'express';
import { createExpressServer } from '..';

const app = express();

//TODO: add support for absolute paths
createExpressServer(app, { controllers: ['./controllers/*.ts'] }).listen(3000, () => {
  console.log('http://localhost:3000');
});
