import { NextFunction, Request, Response } from 'express';
export interface BaseConfig {
  /**
   * An array of DangoControllers or glob path referencing to a folder
   * @example
    ```ts
    createExpressServer(app, {
      prefix: '/api',
      controllers: [
        'controllers/*.ts',
        createController('/m', [
          {
            path: '/',
            method: 'get',
            handler: (req, res, body: User, params, queries) => {
              res.send('m');
            },
          },
        ]),
      ]
    });
    ```
   */
  controllers: (string | DangoController)[];
  /**
   * Prefix all controller routes
   *@example
  ```ts
    createExpressServer(app, {
      prefix: '/api',
    })
  ```
   */
  prefix?: string;
  /**
   * Array of middleware to be used in global scope
   */
  middlewares?: DangoMiddleware[];
}
export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
export interface ParamsDict {
  [key: string]: string;
}

export type anyObj = { [x: string]: any };
export type methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type DangoController = {
  _path: string | RegExp;
  _routes: ReadonlyArray<DangoRoute>;
  _middlewares?: ReadonlyArray<DangoMiddleware>;
};

export type DangoRouteHandler<B = any, P = any, Q = any> = (
  /**
   * handler request object
   */
  req: Request<P, any, B, Q>,
  /**
   * handler response object
   */
  res: Response,
  /**
   * request body
   */
  body: B,
  /**
   * route params
   */
  params: P,
  /**
   * route queries
   */
  query: Q,
) => void;

export interface DangoRoute<B = any, P = any, Q = any> {
  /**
   * Route path
   */
  path: string | RegExp;
  /**
   * Route handler method
   */
  method: methods;
  /**
   * Route handler
   */
  handler: DangoRouteHandler<B, P, Q>;
  /**
   * Array of Route specific middlewares
   */
  middlewares?: DangoMiddleware[];
}

export type DangoMiddleware = (req: Request, res: Response, next: NextFunction) => void;
