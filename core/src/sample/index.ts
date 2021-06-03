import { createController, createHandler } from 'src/routing';

const indexController = createController({
  path: '/',
});

createHandler(indexController).Get('/', (req, res) => {
  res.send('yololo');
});

createHandler(indexController).Get('/yolo/:main/:id', (req, res, params, queries) => {
  res.send('secnd route');
});
export default indexController;
