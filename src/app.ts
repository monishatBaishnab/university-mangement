import express, { Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Server is running smoothly.',
  });
});

export default app;
