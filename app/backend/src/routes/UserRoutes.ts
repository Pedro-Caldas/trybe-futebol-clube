import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';

export default class UserRoutes {
  public route: Router;
  private _userController: UserController;

  constructor(userController = new UserController()) {
    this.route = Router();
    this._userController = userController;

    this.route.post('/', (req: Request, res: Response) => this._userController.login(req, res));
  }
}
