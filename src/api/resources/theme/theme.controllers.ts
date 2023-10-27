import { NextFunction, Request, Response } from "express-serve-static-core";
import { ITheme } from "../../../interfaces";

const fs = require('fs');
const path = require('path');

const dataPath = path.resolve((global as any).__basedir, 'src', 'database', 'db.json');

const mockThemes = [
    { id: '1',
      mainBgColorHex: '#fff',
      textColorHex: '#8d61ae',
      highlightColorHex: '#95c852',
    },
    { id: '2',
      mainBgColorHex: '#454545',
      textColorHex: '#fff',
      highlightColorHex: '##31a617',
    }
];

export const getAllThemes = (req: Request, res: Response) => {
    const themes = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const result = { entries: themes, count: mockThemes.length };
    res.status(200).json(result);
};

export const getThemeById = (req: Request, res: Response) => {
  const themeId = req.params.id;
  const themes = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const theme = themes.find((theme: ITheme) => theme.id === themeId);
  if (theme) {
    res.json(theme);
  } else {
    res.status(404).json({ error: 'Theme not found' });
  }
};
