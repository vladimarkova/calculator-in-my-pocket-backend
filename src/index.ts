import { json } from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import themeRouter from './api/resources/theme/theme.router';

const app = express();
const port = process.env.PORT || 8000;

app.use(json());

const allowedOrigins = [
  "https://localhost:4200",
  "http://localhost:4200",
  "http://vladimarkova.github.io/calculator-in-my-pocket",
  "https://vladimarkova.github.io/calculator-in-my-pocket",
  'http://vladimarkova.github.io',
  'https://vladimarkova.github.io'
];

const corsConfig = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
});

app.use(corsConfig);

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.use('/api/theme', themeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
