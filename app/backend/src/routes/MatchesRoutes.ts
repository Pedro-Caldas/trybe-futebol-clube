import { Router, Request, Response } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import MatchesController from '../controllers/MatchesControllers';

export default class MatchesRoutes {
  public route: Router;
  private _matchesController: MatchesController;
  private _loginMiddleware: LoginMiddleware;

  constructor(
    matchesController = new MatchesController(),
    loginMiddleware = new LoginMiddleware(),
  ) {
    this.route = Router();
    this._matchesController = matchesController;
    this._loginMiddleware = loginMiddleware;

    this.route.get('/', (req: Request, res: Response) => this._matchesController
      .findAll(req, res));

    this.route.post(
      '/',
      this._loginMiddleware.tokenValidation,
      (req: Request, res: Response) => this._matchesController.create(req, res),
    );

    this.route.patch('/:id/finish', (req: Request, res: Response) => this._matchesController
      .changeProgress(req, res));
  }
}
