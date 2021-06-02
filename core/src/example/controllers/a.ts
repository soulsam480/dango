import { createHandler } from 'src/routing/createHandler';
import { createController } from 'src/routing';

const aController = createController({
  path: '/',
});

createHandler(aController).Get('/', (req, res) => {
  res.send('yolo');
});
export default aController;
