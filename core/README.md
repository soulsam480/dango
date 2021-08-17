## Dango

> Dumpling in japaneese.

POC for functional `controllers` and `route-handlers` in express.

![npm](https://img.shields.io/npm/v/dango-core) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/dango-core) ![GitHub](https://img.shields.io/github/license/soulsam480/dango) ![npm](https://img.shields.io/npm/dm/dango-core)

### What is expected
- Functional way of writing routers
- Follow function programming concepts
- Composition over inheritance
### Update v1.0.0
I'm not very familiar with `functional programming` and it's concepts. I'm learning it now and it turns out the `v0.0.2` dango code was not functional at all and it has been scraped see tag [v0.0.2](https://github.com/soulsam480/dango/releases/tag/0.0.2). I'll be proposing a new `API` for dango again. As we have been doing `OOP` for so long, `FP` will take some time to be fully understood.

### Breaking changes
- `CreateHandler` has been scraped
- `CreateController` params changed.
### Proposed API

Core:
- [`createExpressServer`](#express-wrapper)
- [`createController`](#controllers)
- [`createRoute`](#routes)

#### Express wrapper

- A wrapper on `express` to inject controllers.
- Can be used as 

```ts  // "sourceMap": true 
import express from 'express';
import { createExpressServer } from 'dango-core';

const app = express();

createExpressServer(app, { controllers: ['./controllers/*.ts'] }).listen(3000, () => {
  console.log('http://localhost:3000');
});

```
- controller definition should be a `glob` path.

#### Controllers

- A controller can be created with `createController` method. 

```ts
import { createController } from 'dango-core';

export default createController(
  '/',
  [
    {
      path: '/',
      method: 'get',
      handler: (req, res, params, queries) => {
        res.send('is this working ?');
      },
      middlewares: [
        (req, res, next) => {
          res.send("I'm local");
        },
      ],
    },
  ],
  [
    (req, res, next) => {
      res.send("I'm global");
    },
  ],
);
```
- Should be default exported from the controller file.

#### Routes

This is a low level API which can be used to create routes with proper type definitions for request body,params and query. Can be used with [`createController`](#controllers) for modularity.

- standalone
```ts
  import { createRoute } from 'dango-core';

  const userRoute = createRoute<{ user: string }>({
    path: '/user',
    method: 'options',
    handler: (req, res, body) => {
      // proper ts definitions
      req.body.user;
    },
  });
```
- with controller
```ts
  import { createController } from 'dango-core';

  export default createController('/aa', [userRoute]);
```
- With express router style `function chaining`
```ts
import { createRoute } from 'dango-core';

const home = createRoute<{ user: string }>('/')
  .method('get')
  .handler((_, res) => res.send('OK'));
```

#### Middlewares

##### Global

```ts
import express from 'express';
import { createExpressServer } from 'dango-core';
const app = express();

createExpressServer(app, {
  controllers: ['controllers/**.ts'],
  middlewares: [
    (req, res, next) => {
      res.send("I'm global");
    },
  ],
}).listen(4000, () => console.log('http://localhost:4000'));
```
##### Controller specific

```ts
import { createController } from 'dango-core';

export default createController(
  '/test',
  [
    {
      path: '/yolo',
      method: 'get',
      handler: (req, res) => {
        res.send('is this working ?');
      },
    },
  ],
  [
    (req, res, next) => {
      res.send("I'm controller specific");
    },
  ],
);
```

##### Route specific
```ts
import { createController } from 'dango-core';

export default createController('/test', [
  {
    path: '/yolo',
    method: 'get',
    handler: (req, res) => {
      res.send('is this working ?');
    },
    middlewares: [
      (req, res, next) => {
        res.send("I'm route specific");
      },
    ],
  },
]);
```
#### Helpers

- #### `response.sendError`

  - send HTTP errors from response with proper intellisense
    ```ts
    import { createController, createRoute } from 'dango-core';

    const someRoute = createRoute<{ user: string }>({
      path: '/',
      method: 'get',
      handler: (req, res, body) => {
        res.sendError(401,"Nope")
      },
    });

    export default createController('/home', [someRoute]);
    ```
### Packages

| Package | version                                         |
| ------- | ----------------------------------------------- |
| Core    | ![npm](https://img.shields.io/npm/v/dango-core) |
| Example | NA                                              |