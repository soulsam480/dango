import { BaseConfig, DangoController } from 'src/types';
import { sync } from 'fast-glob';
import express, { Express } from 'express';
/**
 * Create a Dango wrapper of express server with specific options
 * @param server
 * @param options 
 * @returns Express instance
 * @example
 * ```ts
 * import express from 'express';
   const app = express();
   createExpressServer(app, {
      controllers: ['src/sample/**.ts'],
    }).listen(3000, () => console.log('http://localhost:3000'));
 * ```
 */
export const createExpressServer = (
  server: Express,
  { controllers, middlewares }: BaseConfig,
): Express => {
  if (middlewares && middlewares.length > 0) {
    server.use(...middlewares);
  }
  // get all files from the glob pattern
  const controllerEntires = sync(controllers, { dot: false });
  //loop over them to validate and add routes

  controllerEntires.forEach((controller) => {
    let file = require(controller);
    file = Object.freeze(file);

    if (!file || file.default._routes.length === 0)
      throw new Error("Controller doesn't exist or route handler is missing !");

    const dangoController: DangoController = file.default;
    const router = express.Router();

    dangoController._routes.forEach(({ handler, method, path, middlewares }) => {
      // check and add local middlewares
      if (middlewares && middlewares.length > 0) {
        // add handlers to app instance
        router[method](path, ...middlewares, (req, res) => {
          handler(req, res, req.params, req.query);
        });
        return;
      }
      router[method](path, (req, res) => {
        handler(req, res, req.params, req.query);
      });
    });
    if (dangoController._middlewares && dangoController._middlewares.length > 0) {
      server.use(dangoController._path, ...dangoController._middlewares, router);
      return;
    }
    server.use(dangoController._path, router);
  });

  return server;
};
