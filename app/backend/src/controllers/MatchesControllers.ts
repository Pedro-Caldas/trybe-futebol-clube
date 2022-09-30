import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/UsersService';
import TeamsService from '../services/TeamsService';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private _matchesService = new MatchesService(),
    private _teamsService = new TeamsService(),
    private _userService = new UsersService(),
  ) { }

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

  public async create(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
    await this._userService.tokenValidate(authorization);

    const verifiedTeams = await this._teamsService.verifyTeams(homeTeam, awayTeam);
    if (!verifiedTeams) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'There is no team with such id!' });
    }

    if (homeTeam === awayTeam) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const result = await this._matchesService
      .create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(StatusCodes.CREATED).json(result);
  }

  public async changeProgress(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this._matchesService.changeProgress(Number(id));
    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }
}
