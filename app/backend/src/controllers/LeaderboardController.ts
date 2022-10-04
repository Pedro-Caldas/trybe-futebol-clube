import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HomeLeaderboardsService from '../services/HomeLeaderboardService';
import AwayLeaderboardsService from '../services/AwayLeaderboardService';

export default class LeaderboardController {
  constructor(
    private _homeLeaderboardsService = new HomeLeaderboardsService(),
    private _awayLeaderboardsService = new AwayLeaderboardsService(),
  ) { }

  public async findHomeLeaderboard(req: Request, res: Response) {
    const homeLeaderboard = await this._homeLeaderboardsService.getHomeLeaderboard();
    res.status(StatusCodes.OK).json(homeLeaderboard);
  }

  public async findAwayLeaderboard(req: Request, res: Response) {
    const awayLeaderboard = await this._awayLeaderboardsService.getAwayLeaderboard();
    res.status(StatusCodes.OK).json(awayLeaderboard);
  }
}
