import { DangoController, DangoMiddleware, DangoRoute, DangoRouteChain } from 'src/types';
/**
 * Create a Dango controller with routes, middlewares.
 * @param path
 * @param routes
 * @param middlewares
 * @returns DangoController instance
 * @example
 * ```ts
 *  import { createController } from 'dango-core';

    export default createController('/', [
      {
        path: '/',
        method: 'get',
        handler: ({req, res}) => {
          res.send('test on home');
        },
      },
      {
        path: '/test/:id',
        method: 'get',
        handler: ({req, res}) => {
          res.send('test with id');
        },
        middlewares: [
          (req, res, next) => {
            if (req.params.id !== 'xx') {
              next('no param');
            }
            next();
          },
        ],
      },
    ]);
 * ```
 */
export const createController = (
  path: string,
  routes: (DangoRoute | DangoRouteChain)[],
  middlewares?: DangoMiddleware[],
): DangoController => {
  return {
    _path: path,
    _routes: Object.freeze(
      routes
        .map<DangoRoute>((el) => {
          if (new Object(el).hasOwnProperty('_route')) {
            return (el as DangoRouteChain)._route;
          }

          return el as DangoRoute;
        })
        .filter((v, i, a) => a.findIndex((t) => t.path === v.path && t.method === v.method) === i),
    ),
    _middlewares: Object.freeze(middlewares),
  };
};
