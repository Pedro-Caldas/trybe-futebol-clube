import * as express from 'express';
import UsersRoutes from './routes/UsersRoutes';
import TeamsRoutes from './routes/TeamsRoutes';
import MatchesRoutes from './routes/MatchesRoutes';

class App {
  public app: express.Express;
  private _usersRoutes: UsersRoutes;
  private _teamsRoutes: TeamsRoutes;
  private _matchesRoutes: MatchesRoutes;

  constructor(
    usersRoutes = new UsersRoutes(),
    teamsRoutes = new TeamsRoutes(),
    matchesRoutes = new MatchesRoutes(),
  ) {
    this.app = express();

    this.config();

    this._usersRoutes = usersRoutes;
    this._teamsRoutes = teamsRoutes;
    this._matchesRoutes = matchesRoutes;

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', this._usersRoutes.route);
    this.app.use('/teams', this._teamsRoutes.route);
    this.app.use('/matches', this._matchesRoutes.route);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
