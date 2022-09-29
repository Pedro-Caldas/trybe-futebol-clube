import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

export default class TeamsRoutes {
  public route: Router;
  private _teamsController: TeamsController;

  constructor(
    userController = new TeamsController(),
  ) {
    this.route = Router();
    this._teamsController = userController;

    this.route.get(
      '/',
      (req: Request, res: Response) => this._teamsController.findAll(req, res),
    );
  }
}
