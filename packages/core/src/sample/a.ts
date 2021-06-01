import { createController } from 'src/routing';

const aController = createController({
  path: '/',
});
aController.createGetRouter('/main', (req, res) => {
  console.log('yoyo');
});
aController.createGetRouter('/yolo', (req, res) => {
  console.log('tolo');
});

export default aController;
