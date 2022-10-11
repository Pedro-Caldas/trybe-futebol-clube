import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import MatchModel from '../database/models/matches';

export default class MatchesService {
  private _matchModel = MatchModel;
  private _teamModel = Team;

  public async findAll(): Promise<IMatch[]> {
    const result = await this._matchModel.findAll({
      include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result as unknown as IMatch[];
  }

  public async findByProgress(inProgress: string): Promise<IMatch[]> {
    if (inProgress === 'true') {
      return await this._matchModel
        .findAll({ include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
        where: { inProgress: true } }) as unknown as IMatch[];
    }
    return await this._matchModel
      .findAll({ include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
      where: { inProgress: false } }) as unknown as IMatch[];
  }

  public async verifyTeams(homeTeam: number, awayTeam: number) {
    const foundHomeTeam = await this._teamModel.findByPk(homeTeam);
    const foundAwayTeam = await this._teamModel.findByPk(awayTeam);
    if (!foundHomeTeam || !foundAwayTeam) {
      return null;
    }
    return true;
  }

  public async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> {
    const result = await this._matchModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
    return result;
  }

  public async update(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await this._matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async changeProgress(id: number) {
    await this._matchModel.update({ inProgress: false }, { where: { id } });
  }
}
