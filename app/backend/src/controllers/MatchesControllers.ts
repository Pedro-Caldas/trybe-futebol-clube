import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) { }

  public async findAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    let result;
    if (!inProgress) {
      result = await this._matchesService.findAll();
    } else {
      result = await this._matchesService.findByProgress(inProgress as string);
    }
    res.status(StatusCodes.OK).json(result);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const result = await this._matchesService
      .create(
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
      );
    res.status(StatusCodes.CREATED).json(result);
  }
}
