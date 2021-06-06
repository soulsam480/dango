import { createController } from 'dango-core';
async function mockPromise(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 3000);
  });
}

export default createController('/ddd', [
  {
    path: '/',
    method: 'get',
    handler: async (req, res) => {
      res.send(`result ${await mockPromise()}`);
    },
  },
]);
