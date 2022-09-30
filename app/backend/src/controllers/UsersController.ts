import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors/CustomError';
import UsersService from '../services/UsersService';

export default class UserController {
  constructor(private _usersService = new UsersService()) { }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const token = await this._usersService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
  }

  public async loginValidate(req: Request, res: Response): Promise<void | unknown> {
    const { authorization } = req.headers;

    if (authorization) {
      const role = await this._usersService.tokenValidate(authorization);
      return res.status(StatusCodes.OK).json({ role });
    }
    throw new CustomError(401, 'UNAUTHORIZED', 'Invalid token');
  }
}
