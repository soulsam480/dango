import { NextFunction, Request, Response } from 'express';
import { HTTPCodes } from 'src/helpers/constants';
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
            handler: ({req, res, body, params, query}) => {
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

export type HTTPErrorCodes = typeof HTTPCodes[keyof typeof HTTPCodes] | keyof typeof HTTPCodes;

export interface DangoResponse extends Response {
  sendError(status: HTTPErrorCodes, message?: any): this;
}

export interface HandlerCtx<B, P, Q> {
  /**
   * handler request object
   */
  req: Request<P, any, B, Q>;
  /**
   * handler response object
   */
  res: DangoResponse;
  /**
   * request body
   */
  body: B;
  /**
   * route params
   */
  params: P;
  /**
   * route queries
   */
  query: Q;
}

export type DangoRouteHandler<B, P, Q> = (ctx: HandlerCtx<B, P, Q>) => void;

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

export interface DangoRouteChain<B = any, P = any, Q = any> {
  _route: DangoRoute<B, P, Q>;
  method(method: methods): this;
  handler(handler: DangoRouteHandler<B, P, Q>): this;
}
