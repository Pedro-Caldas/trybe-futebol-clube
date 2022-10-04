import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HomeLeaderboardsService from '../services/HomeLeaderboardsService';

export default class LeaderboardController {
  constructor(
    private _homeLeaderboardsService = new HomeLeaderboardsService(),
  ) { }

  public async findHomeLeaderboard(req: Request, res: Response) {
    const homeLeaderboard = await this._homeLeaderboardsService.getHomeLeaderboard();
    res.status(StatusCodes.OK).json(homeLeaderboard);
  }
}
