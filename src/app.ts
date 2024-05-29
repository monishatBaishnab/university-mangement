import express, { Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import userRoute from './app/modules/user/user.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users/', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Server is running smoothly.',
  });
});

export default app;
