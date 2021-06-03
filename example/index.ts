import express from 'express';
import { createExpressServer } from 'dango-core';
const app = express();

createExpressServer(app, {
  controllers: ['controllers/**.ts'],
}).listen(3000, () => console.log('http://localhost:3000'));