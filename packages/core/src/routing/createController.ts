import { DangoControllerOptions, DangoRouteHandler, DangoRouterStack } from 'src/types';

export function createController(options: DangoControllerOptions) {
  let _routerStack: DangoRouterStack = {
    _path: options.path || '',
    _routes: [],
  };
  return {
    _routerStack,
    createGetRouter: (path: string, handler: DangoRouteHandler) => {
      _routerStack._routes.push({
        path,
        method: 'get',
        handler,
      });
    },
  };
}
