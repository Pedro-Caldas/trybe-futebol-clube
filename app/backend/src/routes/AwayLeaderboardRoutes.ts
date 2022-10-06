import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

export default class AwayLeaderboardRoutes {
  public route: Router;

  constructor(
    private _leaderboardController = new LeaderboardController(),
  ) {
    this.route = Router();

    this.route.get('/', (req: Request, res: Response) => this._leaderboardController
      .findAwayLeaderboard(req, res));
  }
}
