import { Router, Request, Response } from 'express';
import UsersController from '../controllers/UsersController';
import LoginMiddleware from '../middlewares/LoginMiddleware';

export default class UserRoutes {
  public route: Router;
  private _usersController: UsersController;
  private _loginMiddleware: LoginMiddleware;

  constructor(
    usersController = new UsersController(),
    loginMiddleware = new LoginMiddleware(),
  ) {
    this.route = Router();
    this._usersController = usersController;
    this._loginMiddleware = loginMiddleware;

    this.route.post(
      '/',
      this._loginMiddleware.bodyValidation,
      (req: Request, res: Response) => this._usersController.login(req, res),
    );

    this.route.get(
      '/validate',
      (req: Request, res: Response) => this._usersController.loginValidate(req, res),
    );
  }
}
