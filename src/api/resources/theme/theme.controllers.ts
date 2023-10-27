import { NextFunction, Request, Response } from "express-serve-static-core";
import { ERROR_MESSAGES } from "../../../constants";
import { ITheme } from "../../../interfaces";
import { promises as fs } from 'fs';
import * as path from 'path';

const dataPath = path.resolve((global as any).__basedir, 'src', 'database', 'db.json');

const mockThemes = [
    { id: '1',
      title: 'LightBlue',
      mainBgColorHex: '#fff',
      textColorHex: '#8d61ae',
      highlightColorHex: '#95c852',
    },
    { id: '2',
      title: 'DarkOrange',
      mainBgColorHex: '#454545',
      textColorHex: '#fff',
      highlightColorHex: '##31a617',
    }
];

export const getAllThemes = (req: Request, res: Response) => {
  // console.log('params: ', req.query); // we can use these params for handling pagination logic if needed
  return fs.readFile(dataPath, 'utf-8')
    .then((data: string) => {
      const themes = JSON.parse(data);
      const result = { entries: themes, count: themes.length };
      return res.status(200).json(result);
    })
    .catch((err: any) => {
      console.log('Error loading themes: ', err);
      return res.status(500).json({ error: ERROR_MESSAGES.THEMES.ERROR_LOADING_THEMES });
    });
};

export const getThemeById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json({ error: ERROR_MESSAGES.DATA.MISSING_DATA });
  }

  return fs.readFile(dataPath, 'utf-8')
    .then((data: string) => {
      const themes = JSON.parse(data);
      const theme = themes.find((theme: ITheme) => theme.id === id);
      if (theme) {
        return res.json(theme);
      } else {
        return res.status(404).json({ error: ERROR_MESSAGES.DATA.MISSING_DATA });
      }
    })
    .catch((err: any) => {
      console.log('Error loading themes: ', err);
      return res.status(500).json({ error: ERROR_MESSAGES.THEMES.ERROR_LOADING_THEME });
    });
};

export const createTheme = (req: Request, res: Response) => {
  const newTheme: ITheme = {
    id: `${Date.now()}-${Math.random()}`, // could be replaced by using uuid
    ...req.body
  };

  return fs.readFile(dataPath, 'utf-8')
    .then((data: string) => {
      const themes = JSON.parse(data);
      themes.push(newTheme);
      return Promise.all([newTheme, fs.writeFile(dataPath, JSON.stringify(themes, null, 2), 'utf-8')]);
    })
    .then(([theme, _]) => res.status(200).json(theme))
    .catch((err: any) => {
      console.log('Error loading themes: ', err);
      return res.status(500).json({ error: ERROR_MESSAGES.THEMES.ERROR_CREATING_THEME });
    });
}

export const updateTheme = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json({ error: ERROR_MESSAGES.DATA.MISSING_DATA });
  }

  return fs.readFile(dataPath, 'utf-8')
    .then((data: string) => {
      const themes = JSON.parse(data);
      const themeToUpdate = themes.find((theme: ITheme) => theme.id === id);
      if (!themeToUpdate) {
        return Promise.reject(new Error(ERROR_MESSAGES.DATA.MISSING_DATA));
      }
      const updatedTheme = req.body;
      const updatedThemes = themes.map((theme: ITheme) => theme.id === themeToUpdate.id ? updatedTheme: theme);
      return Promise.all([updatedTheme, fs.writeFile(dataPath, JSON.stringify(updatedThemes, null, 2), 'utf-8')]);
    })
    .then(([theme, _]) => {
      return res.status(200).json(theme);
    })
    .catch((err) => {
      console.log('Error updating theme: ', err);
      return res.status(500).json({ error: ERROR_MESSAGES.THEMES.ERROR_UPDATING_THEME });
    });
}

export const deleteTheme = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json({ error: ERROR_MESSAGES.DATA.MISSING_DATA });
  }
  return fs.readFile(dataPath, 'utf-8')
    .then((data: string) => {
      const themes = JSON.parse(data);
      const themeToDelete = themes.find((theme: ITheme) => theme.id === id);
      if (!themeToDelete) {
        return Promise.reject(new Error(ERROR_MESSAGES.DATA.MISSING_DATA));
      }
      const resultThemes = themes.filter((theme: ITheme) => theme.id !== themeToDelete.id);
      return Promise.all([themeToDelete, fs.writeFile(dataPath, JSON.stringify(resultThemes, null, 2), 'utf-8')]);
    })
    .then(([theme, _]) => {
      return res.status(200).json(theme);
    })
    .catch((err) => {
      console.log('Error deleting theme: ', err);
      return res.status(500).json({ error: ERROR_MESSAGES.THEMES.ERROR_DELETING_THEME });
    });
}
