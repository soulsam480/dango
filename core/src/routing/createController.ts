import { DangoController, DangoControllerOptions, DangoRouterStack } from 'src/types';

export function createController(options: DangoControllerOptions): DangoController {
  let _routerStack: DangoRouterStack = {
    _path: options.path || '',
    _routes: [],
  };
  return {
    _routerStack: Object.freeze(_routerStack),
  };
}
