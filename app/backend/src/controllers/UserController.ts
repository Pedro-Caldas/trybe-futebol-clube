import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this._userService.login(email, password);
    if (token === null) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Incorrect email or password' });
    }
    res.status(StatusCodes.OK).json({ token });
  }

  public async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const role = await this._userService.loginValidate(authorization);
      res.status(StatusCodes.OK).json({ role });
    }
  }
}
