import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/LeaderboardService';
import HomeLeaderboardsService from '../services/HomeLeaderboardService';
import AwayLeaderboardsService from '../services/AwayLeaderboardService';

export default class LeaderboardController {
  constructor(
    private _leaderboardService = new LeaderboardService(),
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

  public async findLeaderboard(req: Request, res: Response) {
    const leaderboard = await this._leaderboardService.getSortedLeaderboard();
    res.status(StatusCodes.OK).json(leaderboard);
  }
}
