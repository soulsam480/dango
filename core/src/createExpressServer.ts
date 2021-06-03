import { BaseConfig, DangoRouterStack } from 'src/types';
import { sync } from 'fast-glob';
import express, { Express, Request, Response } from 'express';
export const createExpressServer = (server: Express, { controllers }: BaseConfig): Express => {
  const controllerEntires = sync(controllers, { dot: false });
  controllerEntires.forEach((controller) => {
    const file = require(controller);
    if (!file || file.default._routerStack._routes.length === 0) return;
    const dangoRouterStack: DangoRouterStack = file.default._routerStack;
    const router = express.Router();
    dangoRouterStack._routes.forEach(({ handler, method, path }) => {
      function main(req: Request, res: Response): void {
        handler(req, res, req.params, req.query);
      }
      router[method](path, main);
    });
    server.use(dangoRouterStack._path, router);
  });
  return server;
};

const app = express();

createExpressServer(app, {
  controllers: ['src/sample/**.ts'],
}).listen(3000, () => console.log('http://localhost:3000'));
