import { Router, Request, Response } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import MatchesMiddleware from '../middlewares/MatchesMiddeware';
import MatchesController from '../controllers/MatchesControllers';

export default class MatchesRoutes {
  public route: Router;
  private _matchesController: MatchesController;
  private _loginMiddleware: LoginMiddleware;
  private _matchesMiddleware: MatchesMiddleware;

  constructor(
    matchesController = new MatchesController(),
    loginMiddleware = new LoginMiddleware(),
    matchesMiddleware = new MatchesMiddleware(),
  ) {
    this.route = Router();
    this._matchesController = matchesController;
    this._loginMiddleware = loginMiddleware;
    this._matchesMiddleware = matchesMiddleware;

    this.route.get('/', (req: Request, res: Response) => this._matchesController
      .findAll(req, res));

    this.route.post(
      '/',
      this._loginMiddleware.tokenValidation,
      this._matchesMiddleware.matchValidation,
      (req: Request, res: Response) => this._matchesController.create(req, res),
    );

    this.route.patch('/:id/finish', (req: Request, res: Response) => this._matchesController
      .changeProgress(req, res));
  }
}
