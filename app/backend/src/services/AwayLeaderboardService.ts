import ILeaderboard from '../interfaces/ILeaderboard';
import TeamModel from '../database/models/team';
import MatchModel from '../database/models/matches';

export default class AwayLeaderboardService {
  private _matchModel = MatchModel;
  private _teamModel = TeamModel;

  public async getTeams() {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  public async getFinishedMatches() {
    const matches = await this._matchModel.findAll({ where: { inProgress: false } });
    return matches;
  }

  public async getAwayMatches() {
    const teams = await this.getTeams();
    const matches = await this.getFinishedMatches();
    const teamsAwayMatches = teams.map((team) => {
      const awayMatches = matches.filter((match) => match.awayTeam === team.id);
      return awayMatches;
    });
    return teamsAwayMatches;
  }

  public async getTotalAwayGames() {
    const awayMatches = await this.getAwayMatches();
    const totalAwayGames = awayMatches.map((match) => match.length);
    return totalAwayGames;
  }

  public async getVictories() {
    const awayMatches = await this.getAwayMatches();
    const victories = awayMatches.map((match) => {
      const victory = match.filter((game) => game.awayTeamGoals > game.homeTeamGoals);
      return victory.length;
    });
    return victories;
  }

  public async getDraws() {
    const awayMatches = await this.getAwayMatches();
    const draws = awayMatches.map((match) => {
      const draw = match.filter((game) => game.awayTeamGoals === game.homeTeamGoals);
      return draw.length;
    });
    return draws;
  }

  public async getLosses() {
    const awayMatches = await this.getAwayMatches();
    const losses = awayMatches.map((match) => {
      const loss = match.filter((game) => game.awayTeamGoals < game.homeTeamGoals);
      return loss.length;
    });
    return losses;
  }

  public async getTotalPoints() {
    const victories = await this.getVictories();
    const drawsPoints = await this.getDraws();
    const totalPoints = victories.map((victory, index) => (victory * 3) + drawsPoints[index]);
    return totalPoints;
  }

  public async getGoalsFavor() {
    const awayMatches = await this.getAwayMatches();
    const goalsFavor = awayMatches.map((match) => {
      const goals = match.map((game) => game.awayTeamGoals);
      const sum = goals.reduce((a, b) => a + b, 0);
      return sum;
    });
    return goalsFavor;
  }

  public async getGoalsOwn() {
    const awayMatches = await this.getAwayMatches();
    const goalsOwn = awayMatches.map((match) => {
      const goals = match.map((game) => game.homeTeamGoals);
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
    const totalAwayGames = await this.getTotalAwayGames();
    const efficiency = totalPoints
      .map((point, index) => point / ((totalAwayGames[index] * 3) / 100));
    return efficiency;
  }

  public async getUnsortedAwayLeaderboard() {
    const teams = await this.getTeams();

    const awayLeaderboard = await Promise.all(
      teams.map(async (team, index) => ({
        name: team.teamName,
        totalPoints: (await this.getTotalPoints())[index],
        totalGames: (await this.getTotalAwayGames())[index],
        totalVictories: (await this.getVictories())[index],
        totalDraws: (await this.getDraws())[index],
        totalLosses: (await this.getLosses())[index],
        goalsFavor: (await this.getGoalsFavor())[index],
        goalsOwn: (await this.getGoalsOwn())[index],
        goalsBalance: (await this.getGoalsBalance())[index],
        efficiency: (await this.getEfficiency())[index].toFixed(2),
      })),
    );
    return awayLeaderboard;
  }

  public async getAwayLeaderboard(): Promise<ILeaderboard[]> {
    const unsortedAwayLeaderboard = await this.getUnsortedAwayLeaderboard();
    const awayLeaderboard = unsortedAwayLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return awayLeaderboard as unknown as ILeaderboard[];
  }
}
