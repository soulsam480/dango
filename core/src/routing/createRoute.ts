import { toString } from 'src/helpers/index';
import { DangoRoute, DangoRouteChain } from 'src/types/index';

/**
 * A low level wrapper for creating dango routes.
 * 
 * Recommended when proper type definitions for request params,body and query is needed
 * @param ctx Dango route context
 * @returns Dango route object
 * @example
 * ```ts
  const userRoute = createRoute<{ user: string }>({
    path: '/user',
    method: 'options',
    handler: (req, res, body) => {
      req.body.user;
    },
  });
 * ```
 * Can be used with createController for modularity
 *  @example
 * ```ts
  export default createController('/aa', [userRoute]);
   ```
  */

export function createRoute<B = any, P = any, Q = any>(
  ctx: DangoRoute<B, P, Q>,
): DangoRouteChain<B, P, Q>;
export function createRoute<B = any, P = any, Q = any>(ctx: string): DangoRouteChain<B, P, Q>;
export function createRoute<B = any, P = any, Q = any>(ctx: any): DangoRouteChain<B, P, Q> {
  const _route: DangoRoute<B, P, Q> =
    toString(ctx) === '[object Object]' ? ctx : ({ path: ctx } as DangoRoute);

  return {
    _route,
    method: function (method) {
      this._route.method = method;
      return this;
    },
    handler: function (handler) {
      this._route.handler = handler;
      return this;
    },
  };
}
