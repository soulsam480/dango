import { isPathDuplicate } from 'src/helpers';
import { DangoController, DangoHandler, DangoRoute, DangoRouteHandler } from 'src/types';

export function createHandler(controller?: DangoController): DangoHandler {
  this._controller = controller;
  this.Get = function (path: string, handler: DangoRouteHandler): DangoRoute {
    const route: DangoRoute = {
      path,
      method: 'get',
      handler,
    };
    if (this._controller) {
      if (isPathDuplicate(route, this._controller._routerStack._routes)) return route;
      this._controller._routerStack._routes.push(route);
      return route;
    }
    return route;
  };
  this.Post = function (path: string, handler: DangoRouteHandler): DangoRoute {
    const route: DangoRoute = {
      path,
      method: 'post',
      handler,
    };
    if (controller) {
      if (isPathDuplicate(route, controller._routerStack._routes)) return route;
      controller._routerStack._routes.push(route);
      return route;
    }
    return route;
  };
  return this;
}
