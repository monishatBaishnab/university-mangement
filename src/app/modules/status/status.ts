import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

const statusRouter = Router();

statusRouter.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Server is running smoothly.',
  });
});

export default statusRouter;
