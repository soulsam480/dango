import { NextFunction, Request, Response } from 'express';
export interface BaseConfig {
  controllers: (string | DangoController)[];
  middlewares?: DangoMiddleware[];
  prefix?: string;
}

export interface DangoControllerOptions {
  path: string | RegExp;
  routes: DangoRoute[];
  middlewares?: DangoMiddleware[];
}

export type methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export interface ParamsDict {
  [key: string]: string;
}
export type DangoController = {
  _path: string | RegExp;
  _routes: ReadonlyArray<DangoRoute>;
  _middlewares?: ReadonlyArray<DangoMiddleware>;
};

export type DangoRouteHandler = <P extends ParamsDict, Q extends ParsedQs>(
  req: Request,
  res: Response,
  params: P,
  query: Q,
) => void;

export type DangoRoute = {
  path: string | RegExp;
  method: methods;
  handler: DangoRouteHandler;
  middlewares?: DangoMiddleware[];
};

export type DangoMiddleware = (req: Request, res: Response, next: NextFunction) => void;
