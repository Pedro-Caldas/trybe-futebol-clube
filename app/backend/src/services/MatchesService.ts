import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import MatchModel from '../database/models/matches';

export default class MatchesService {
  private _matchModel = MatchModel;

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
}
