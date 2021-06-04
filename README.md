## Dango

> Dumpling in japaneese.

POC for functional `controllers` and `route-handlers` in express.

### Update
I'm not fmailiar with `functional programming` and it's concepts. I'm learning it now and it turns out the current dango code is not functional at all. I'll be proposing a new `API` for dango again. As we have been doing `OOP` for so long, `FP` will take some time to be fully understood. The current API may be scraped out completely, but I'll be tagging it for future reference. Thanks. 

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
