import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesControllers';

export default class MatchesRoutes {
  public route: Router;
  private _matchesController: MatchesController;

  constructor(
    matchesController = new MatchesController(),
  ) {
    this.route = Router();
    this._matchesController = matchesController;

    this.route.get(
      '/',
      (req: Request, res: Response) => this._matchesController.findAll(req, res),
    );
  }
}
