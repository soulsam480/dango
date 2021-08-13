import { DangoRoute } from 'src/types/index';

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
): DangoRoute<B, P, Q> {
  return Object.freeze(ctx);
}
