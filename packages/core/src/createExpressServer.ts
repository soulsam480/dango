import { BaseConfig, DangoRouterStack } from 'src/types';
import { sync } from 'fast-glob';
import express, { Express, Router } from 'express';
export const createExpressServer = (server: Express, { controllers }: BaseConfig) => {
  const controllerEntires = sync(controllers, { dot: false });
  controllerEntires.forEach((controller) => {
    const file = require(controller);
    if (!file || file.default._routerStack._routes.length === 0) return;
    const dangoRouterStack: DangoRouterStack = file.default._routerStack;
    const router = express.Router();
    dangoRouterStack._routes.forEach(({ handler, method, path }) => {
      router[method](path, handler);
    });
    console.log(router);
    server.use(dangoRouterStack._path, router);
  });
};

const app = express();
//TODO: add support for absolute paths
createExpressServer(app, { controllers: ['src/sample/*.ts'] });

console.log(app.routes);
