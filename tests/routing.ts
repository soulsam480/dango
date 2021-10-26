// tests/demo.js
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { createRoute, DangoRoute } from 'dango-core';

test('Create route with object syntax', () => {
  // object syntax
  const route: DangoRoute = {
    path: '/',
    method: 'get',
    handler: (ctx) => {
      ctx.res.send('Hello');
    },
  };

  const output = createRoute(route);

  assert.is(output._route.path, '/');
  assert.is(output._route.method, 'get');
  assert.type(output._route.handler, 'function');
});

test('Create route with chaining syntax', () => {
  // chaining syntax

  const output = createRoute('/')
    .method('get')
    .handler((ctx) => ctx.res.send('Hello world'));

  assert.is(output._route.path, '/');
  assert.is(output._route.method, 'get');
  assert.type(output._route.handler, 'function');

  assert.type(output.handler, 'function');
  assert.type(output.method, 'function');
});

test.run();
