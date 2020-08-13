import express from 'express';

const router = express.Router({});

router.get('/health', async (_req, res, _next) => {
  try {
    res.send({
      status: "UP"
    });
  } catch (e) {
    res.status(503).send();
  }
});

export default router;
