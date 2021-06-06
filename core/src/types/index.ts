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
export type methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type DangoController = {
  _path: string | RegExp;
  _routes: ReadonlyArray<DangoRoute>;
  _middlewares?: ReadonlyArray<DangoMiddleware>;
};

export type DangoRouteHandler = (
  /**
   * handler request object
   */
  req: Request,
  /**
   * handler response object
   */
  res: Response,
  /**
   * request body
   */
  body: any,
  /**
   * route params
   */
  params: ParamsDict,
  /**
   * route queries
   */
  query: ParsedQs,
) => void;

export interface DangoRoute {
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
  handler: DangoRouteHandler;
  /**
   * Array of Route specific middlewares
   */
  middlewares?: DangoMiddleware[];
}

export type DangoMiddleware = (req: Request, res: Response, next: NextFunction) => void;
