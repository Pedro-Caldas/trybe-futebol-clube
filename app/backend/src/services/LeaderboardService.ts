import ILeaderboard from '../interfaces/ILeaderboard';
import TeamModel from '../database/models/team';
import HomeLeaderboardService from './HomeLeaderboardService';
import AwayLeaderboardService from './AwayLeaderboardService';

export default class LeaderboardService {
  private _teamModel = TeamModel;

  constructor(
    private _homeLeaderboard = new HomeLeaderboardService(),
    private _awayLeaderboard = new AwayLeaderboardService(),
  ) { }

  public async getTeams() {
    const teams = await this._teamModel.findAll({ raw: true });
    return teams;
  }

  public async getFlatLeaderboards() {
    const homeLeaderboard = await this._homeLeaderboard.getHomeLeaderboard();
    const awayLeaderboard = await this._awayLeaderboard.getAwayLeaderboard();
    const flatLeaderboards = [homeLeaderboard, awayLeaderboard].flat();
    return flatLeaderboards;
  }

  // Function contatLeaderboards() starts by transforming (mapping) teams array into array of teams names because lint wouldn't let me do it separately as it would need 1 more line than the acceptable.
  public async joinLeaderboards() {
    const flatLeaderboards = await this.getFlatLeaderboards();
    const concatLeaderboards = (await this.getTeams()).map((team) => team.teamName).map((team) => {
      const teamRecords = flatLeaderboards.filter((record) => record.name === team);
      return teamRecords.reduce((acc, record) => ({
        name: record.name,
        totalPoints: acc.totalPoints + record.totalPoints,
        totalGames: acc.totalGames + record.totalGames,
        totalVictories: acc.totalVictories + record.totalVictories,
        totalDraws: acc.totalDraws + record.totalDraws,
        totalLosses: acc.totalLosses + record.totalLosses,
        goalsFavor: acc.goalsFavor + record.goalsFavor,
        goalsOwn: acc.goalsOwn + record.goalsOwn,
        goalsBalance: acc.goalsBalance + record.goalsBalance,
        efficiency: (((acc.totalPoints + record.totalPoints)
        / ((acc.totalGames + record.totalGames) * 3)) * 100).toFixed(2),
      }));
    });
    return concatLeaderboards;
  }

  public async getSortedLeaderboard(): Promise<ILeaderboard[]> {
    const concatLeaderboards = await this.joinLeaderboards();
    const sortedLeaderboard = concatLeaderboards.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return sortedLeaderboard as ILeaderboard[];
  }
}
