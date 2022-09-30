import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/team';

export default class TeamsService {
  private _teamModel = TeamModel;

  public async findAll(): Promise<ITeam[]> {
    const result = await this._teamModel.findAll();
    return result as ITeam[];
  }

  public async findOne(id: number): Promise<ITeam> {
    const result = await this._teamModel.findByPk(id);
    return result as ITeam;
  }

  public async verifyTeams(homeTeam: number, awayTeam: number) {
    const foundHomeTeam = await this._teamModel.findByPk(homeTeam);
    const foundAwayTeam = await this._teamModel.findByPk(awayTeam);
    if (!foundHomeTeam || !foundAwayTeam) {
      return null;
    }
    return true;
  }
}
