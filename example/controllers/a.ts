import { createController, createHandler } from '@dango/core';

const aController = createController({
  path: '/',
});

createHandler(aController).Get('/', (req, res) => {
  res.send('yolo');
});

export default aController;
