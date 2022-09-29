import ITeam from '../interfaces/ITeam';
import ITeams from '../interfaces/ITeams';
import TeamModel from '../database/models/team';

export default class TeamsService {
  private _teamModel = TeamModel;

  public async findAll(): Promise<ITeams> {
    const result = await this._teamModel.findAll();
    return result as unknown as ITeams;
  }

  public async findOne(id: number): Promise<ITeam> {
    const result = await this._teamModel.findByPk(id);
    return result as ITeam;
  }
}
