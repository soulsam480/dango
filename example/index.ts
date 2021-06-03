import express from 'express';
import { createExpressServer } from '../core';
const app = express();

createExpressServer(app, {
  controllers: ['controllers/**.ts'],
}).listen(3000);
