import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private _userService = new UserService()) { }

  public async login(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const token = await this._userService.login(email);
    res.status(StatusCodes.OK).json({ token });
  }
}
