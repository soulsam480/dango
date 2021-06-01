import { IRouterMatcher, Request, Response } from 'express';

// import { Express } from 'express';
export interface BaseConfig {
  controllers: string[];
}

export type DangoRouteHandler = (req: Request, res: Response) => void;
export type DangoMethod = (path: string) => DangoRouteHandler;
export type DangoRoute = {
  path: string;
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
  handler: DangoRouteHandler;
};
export type DangoRouterStack = {
  _path: string;
  _routes: DangoRoute[];
};
export interface DangoControllerOptions {
  path: string;
}

export type DangoController = {
  path: string;
};
