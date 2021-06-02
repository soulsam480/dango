import { isPathDuplicate } from 'src/helpers';
import { DangoController, DangoHandler, DangoRoute, DangoRouteHandler } from 'src/types';

export function createHandler(controller?: DangoController): DangoHandler {
  return {
    Get(path: string, handler: DangoRouteHandler): DangoRoute {
      const route: DangoRoute = {
        path,
        method: 'get',
        handler,
      };
      if (controller) {
        if (isPathDuplicate(route, controller._routerStack._routes)) return route;
        controller._routerStack._routes.push(route);
        return route;
      }
      return route;
    },
    Post(path: string, handler: DangoRouteHandler): DangoRoute {
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
    },
  };
}
