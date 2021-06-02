## Dango

> Dumpling in japaneese.

POC for functional `controllers` and `route-handlers` in express.
### Proposed API

Core:
- `createExpressServer`
- `createController`
- `createHandler`
#### Express wrapper

- A wrapper on `express` to inject routes and handlers.
- Can be used as 

```ts
import express from 'express';
import { createExpressServer } from '@dango/core';

const app = express();

//TODO: add support for absolute paths
createExpressServer(app, { controllers: ['./controllers/*.ts'] }).listen(3000, () => {
  console.log('http://localhost:3000');
});

```
- controller definition should be a `glob` path.

#### Controllers

- A controller can be created with `createController` method. 

```ts
import { createController } from '@dango/core';

const aController = createController({
  path: '/',
});

export default aController;
```
- Should be default exported from the controller file.

#### Route handlers

- A handler can be created with `createHandler` method.

```ts
import { createController, createHandler } from '@dango/core';

const aController = createController({
  path: '/',
});

createHandler(aController).Get('/', (req, res) => {
  res.send('yolo');
});

export default aController;
```
- When no controller is passed, it'll create a normal route handler which returns 

```ts
export type DangoRoute = {
  path: string;
  method: methods;
  handler: DangoRouteHandler;
};
```