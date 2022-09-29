import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import LoginMiddleware from '../middlewares/LoginMiddleware';

export default class UserRoutes {
  public route: Router;
  private _userController: UserController;
  private _loginMiddleware: LoginMiddleware;

  constructor(
    userController = new UserController(),
    loginMiddleware = new LoginMiddleware(),
  ) {
    this.route = Router();
    this._userController = userController;
    this._loginMiddleware = loginMiddleware;

    this.route.post(
      '/',
      this._loginMiddleware.validation,
      (req: Request, res: Response) => this._userController.login(req, res),
    );
  }
}
