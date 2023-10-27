import { json } from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import themeRouter from './api/resources/theme/theme.router';

const app = express();
const port = process.env.PORT || 8000;

const corsUrl = [
  "https://localhost:4200",
  "http://localhost:4200",

];

app.use(json());

const corsConfig = cors({
    origin: corsUrl,
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
