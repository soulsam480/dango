import { createController } from 'dango-core';

export default createController(
  '/aa',
  [
    {
      path: '/:id',
      method: 'get',
      handler: (req, res) => {
        res.send('is this working ?');
      },
    },
  ],
  [
    (req, res, next) => {
      if (!req.params.id) return next('no param');
      next();
    },
  ],
);
