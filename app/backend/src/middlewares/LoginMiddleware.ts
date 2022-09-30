import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class LoginMiddleware {
  public bodyValidation = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }

    next();
  };
}
