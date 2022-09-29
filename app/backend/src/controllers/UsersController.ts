import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/UsersService';

export default class UserController {
  constructor(private _usersService = new UsersService()) { }

  public async login(req: Request, res: Response): Promise<void | unknown> {
    const { email, password } = req.body;

    const token = await this._usersService.login(email, password);
    if (token === null) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Incorrect email or password' });
    }
    res.status(StatusCodes.OK).json({ token });
  }

  public async loginValidate(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    if (authorization) {
      const role = await this._usersService.loginValidate(authorization);
      res.status(StatusCodes.OK).json({ role });
    }
  }
}
