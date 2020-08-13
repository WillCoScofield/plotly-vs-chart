import express from 'express';
import mongoose from '../../database';

const router = express.Router({});

router.get('/health', async (_req, res, _next) => {
  if (mongoose.connection.readyState == 1) {
    try {
      res.send({
        status: "UP"
      });
    } catch (e) {
      res.status(503).send();
    }
  } else {
    res.status(503).send();
  }
});

export default router;
