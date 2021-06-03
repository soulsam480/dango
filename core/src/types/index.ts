import { Request, Response } from 'express';
export interface BaseConfig {
  controllers: string[];
}

export interface DangoControllerOptions {
  path: string;
}

export type methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export type DangoController = {
  _routerStack: DangoRouterStack;
};

export type DangoRouteHandler = (
  req: Request,
  res: Response,
  params?: Record<string, string | number | symbol>,
  query?: ParsedQs,
) => void;

export type DangoRoute = {
  path: string;
  method: methods;
  handler: DangoRouteHandler;
};

export type DangoRouterStack = {
  _path: string;
  _routes: DangoRoute[];
};

export interface DangoHandler {
  Get: (path: string, handler: DangoRouteHandler) => DangoRoute;
  Post: (path: string, handler: DangoRouteHandler) => DangoRoute;
}
