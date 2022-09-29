import ITeams from '../interfaces/ITeams';
import TeamModel from '../database/models/team';

export default class TeamsService {
  private _teamModel = TeamModel;

  public async findAll(): Promise<ITeams> {
    const result = await this._teamModel.findAll();
    console.log(result);
    return result as unknown as ITeams;
  }
}
