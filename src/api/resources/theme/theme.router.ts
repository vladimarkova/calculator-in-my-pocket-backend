import express, { Router } from 'express';
import { createTheme, deleteTheme, getAllThemes, getThemeById, updateTheme } from './theme.controllers';
import { myTest } from './theme.middleware';

const router: Router = express.Router();

router.get('/', getAllThemes);

router.get('/:id', getThemeById);

router.post('/', createTheme);

router.put('/:id', updateTheme);

router.delete('/:id', deleteTheme);

export default router;
