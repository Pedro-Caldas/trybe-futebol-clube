import ILeaderboard from '../interfaces/ILeaderboard';
import TeamModel from '../database/models/team';
import MatchModel from '../database/models/matches';

export default class HomeLeaderboardService {
  private _matchModel = MatchModel;
  private _teamModel = TeamModel;

  public async getTeams() {
    const teams = await this._teamModel.findAll({ raw: true });
    return teams;
  }

  public async getFinishedMatches() {
    const matches = await this._matchModel.findAll({ where: { inProgress: false }, raw: true });
    return matches;
  }

  public async getHomeMatches() {
    const teams = await this.getTeams();
    const matches = await this.getFinishedMatches();
    const teamsHomeMatches = teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeam === team.id);
      return homeMatches;
    });
    return teamsHomeMatches;
  }

  public async getTotalHomeGames() {
    const homeMatches = await this.getHomeMatches();
    const totalHomeGames = homeMatches.map((match) => match.length);
    return totalHomeGames;
  }

  public async getVictories() {
    const homeMatches = await this.getHomeMatches();
    const victories = homeMatches.map((match) => {
      const victory = match.filter((game) => game.homeTeamGoals > game.awayTeamGoals);
      return victory.length;
    });
    return victories;
  }

  public async getDraws() {
    const homeMatches = await this.getHomeMatches();
    const draws = homeMatches.map((match) => {
      const draw = match.filter((game) => game.homeTeamGoals === game.awayTeamGoals);
      return draw.length;
    });
    return draws;
  }

  public async getLosses() {
    const homeMatches = await this.getHomeMatches();
    const losses = homeMatches.map((match) => {
      const loss = match.filter((game) => game.homeTeamGoals < game.awayTeamGoals);
      return loss.length;
    });
    return losses;
  }

  public async getTotalPoints() {
    const victories = await this.getVictories();
    const drawsPoints = await this.getDraws();
    const totalPoints = victories.map((victory, index) => victory * 3 + drawsPoints[index]);
    return totalPoints;
  }

  public async getGoalsFavor() {
    const homeMatches = await this.getHomeMatches();
    const goalsFavor = homeMatches.map((match) => {
      const goals = match.map((game) => game.homeTeamGoals);
      const sum = goals.reduce((a, b) => a + b, 0);
      return sum;
    });
    return goalsFavor;
  }

  public async getGoalsOwn() {
    const homeMatches = await this.getHomeMatches();
    const goalsOwn = homeMatches.map((match) => {
      const goals = match.map((game) => game.awayTeamGoals);
      const sum = goals.reduce((a, b) => a + b, 0);
      return sum;
    });
    return goalsOwn;
  }

  public async getGoalsBalance() {
    const goalsFavor = await this.getGoalsFavor();
    const goalsOwn = await this.getGoalsOwn();
    const goalsBalance = goalsFavor.map((goal, index) => goal - goalsOwn[index]);
    return goalsBalance;
  }

  public async getEfficiency() {
    const totalPoints = await this.getTotalPoints();
    const totalHomeGames = await this.getTotalHomeGames();
    const efficiency = totalPoints
      .map((point, index) => point / ((totalHomeGames[index] * 3) / 100));
    return efficiency;
  }

  public async getUnsortedHomeLeaderboard() {
    const teams = await this.getTeams();

    const homeLeaderboard = await Promise.all(
      teams.map(async (team, index) => ({
        name: team.teamName,
        totalPoints: (await this.getTotalPoints())[index],
        totalGames: (await this.getTotalHomeGames())[index],
        totalVictories: (await this.getVictories())[index],
        totalDraws: (await this.getDraws())[index],
        totalLosses: (await this.getLosses())[index],
        goalsFavor: (await this.getGoalsFavor())[index],
        goalsOwn: (await this.getGoalsOwn())[index],
        goalsBalance: (await this.getGoalsBalance())[index],
        efficiency: (await this.getEfficiency())[index].toFixed(2),
      })),
    );
    return homeLeaderboard;
  }

  public async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const unsortedHomeLeaderboard = await this.getUnsortedHomeLeaderboard();
    const homeLeaderboard = unsortedHomeLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return homeLeaderboard as unknown as ILeaderboard[];
  }
}
