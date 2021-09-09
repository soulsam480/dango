import { createController } from 'dango-core';
async function mockPromise(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), 3000);
  });
}

export default createController('/test2', [
  {
    path: '/',
    method: 'get',
    handler: async ({ res }) => {
      res.send(`result ${await mockPromise()}`);
    },
  },
]);
