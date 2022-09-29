import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../database/models';

export default class LoginMiddleware {
  constructor(private _userModel = UserModel) { }

  public validation = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
    }

    next();
  };
}
