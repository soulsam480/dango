import { createController, createHandler } from '../../core';

const aController = createController({
  path: '/',
});

createHandler(aController).Get('/', (req, res) => {
  res.send('yolo');
});

export default aController;
