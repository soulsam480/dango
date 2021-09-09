import { BaseConfig, DangoController } from 'src/types';
import { sync } from 'fast-glob';
import express, { Express } from 'express';
import { appendBaseRoute } from './helpers';
import { HTTPCodes } from 'src/helpers/constants';
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
  { controllers, middlewares, prefix }: BaseConfig,
): Express => {
  if (middlewares && middlewares.length > 0) {
    server.use(...middlewares);
  }

  controllers.forEach((controller) => {
    if (typeof controller === 'string') {
      // get all files from the glob pattern
      const controllerEntires = sync(controller, { dot: false });
      //loop over them to validate and add routes

      for (const controller of controllerEntires) {
        let file = require(controller);
        file = Object.freeze(file);

        if (!file || file.default._routes.length === 0)
          throw new Error("Controller doesn't exist or route handler is missing !");

        const dangoController: DangoController = file.default;
        if (!dangoController._path) throw new Error(' A controller shuld have a base path');

        const router = express.Router();

        for (const { handler, method, path, middlewares } of dangoController._routes) {
          // check and add local middlewares
          if (middlewares && middlewares.length > 0) {
            // add handlers to app instance
            return router[method](path, ...middlewares, (req, res) => {
              handler({
                req: req,
                res,
                body: req.body,
                params: req.params,
                query: req.query,
              });
            });
          }

          router[method](path, (req, res) => {
            handler({
              req: req,
              res,
              body: req.body,
              params: req.params,
              query: req.query,
            });
          });
        }

        if (dangoController._middlewares && dangoController._middlewares.length > 0) {
          return server.use(dangoController._path, ...dangoController._middlewares, router);
        }

        server.use(
          prefix ? appendBaseRoute(prefix, dangoController._path) : dangoController._path,
          router,
        );
      }
    } else if (typeof controller === 'object') {
      if (!controller._path) throw new Error(' A controller shuld have a base path');

      const router = express.Router();

      for (const { handler, method, path, middlewares } of controller._routes) {
        // check and add local middlewares
        if (middlewares && middlewares.length > 0) {
          // add handlers to app instance
          return router[method](path, ...middlewares, (req, res) => {
            handler({ req: req, res, body: req.body, params: req.params, query: req.query });
          });
        }

        router[method](path, (req, res) => {
          handler({ req: req, res, body: req.body, params: req.params, query: req.query });
        });
      }

      if (controller._middlewares && controller._middlewares.length > 0) {
        return server.use(controller._path, ...controller._middlewares, router);
      }

      server.use(prefix ? appendBaseRoute(prefix, controller._path) : controller._path, router);
    }
  });

  server.response.sendError = function (status, message) {
    status = typeof status === 'string' ? HTTPCodes[status] : status;

    if (!message) {
      this.sendStatus(status);
    } else {
      this.status(status).send(message);
    }

    return this;
  };

  return server;
};
