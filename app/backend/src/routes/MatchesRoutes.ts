import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesControllers';

export default class MatchesRoutes {
  public route: Router;

  constructor(
    private _matchesController = new MatchesController(),
  ) {
    this.route = Router();

    this.route.get('/', (req: Request, res: Response) => this._matchesController
      .findAll(req, res));

    this.route.post(
      '/',
      (req: Request, res: Response) => this._matchesController.create(req, res),
    );

    this.route.patch('/:id/', (req: Request, res: Response) => this._matchesController
      .update(req, res));

    this.route.patch('/:id/finish', (req: Request, res: Response) => this._matchesController
      .changeProgress(req, res));
  }
}
