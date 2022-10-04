import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

export default class LeaderboardRoutes {
  public route: Router;

  constructor(
    private _leaderboardController = new LeaderboardController(),
  ) {
    this.route = Router();

    this.route.get('/home', (req: Request, res: Response) => this._leaderboardController
      .findHomeLeaderboard(req, res));
  }
}
