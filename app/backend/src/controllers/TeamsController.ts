import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamsService = new TeamsService()) { }

  public async findAll(req: Request, res: Response): Promise<void> {
    const result = await this._teamsService.findAll();
    res.status(StatusCodes.OK).json(result);
  }

  public async findOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const result = await this._teamsService.findOne(Number(id));
    res.status(StatusCodes.OK).json(result);
  }
}
