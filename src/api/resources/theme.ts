import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API route for themes' });
});

router.get('/:id', (req: Request, res: Response) => {
  const themeId = req.params.id;
  res.json({ themeId });
});

export default router;
