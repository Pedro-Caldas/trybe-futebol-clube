import ITeam from './ITeam';

export default interface ITeams extends ITeam {
  teams: Array<ITeam>;
}
