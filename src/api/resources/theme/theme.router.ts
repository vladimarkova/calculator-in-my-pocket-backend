import express, { Router } from 'express';
import { getAllThemes, getThemeById } from './theme.controllers';
import { myTest } from './theme.middleware';

const router: Router = express.Router();

router.get('/', getAllThemes);

router.get('/:id', getThemeById);

export default router;
