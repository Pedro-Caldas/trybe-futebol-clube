import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';
import { app } from '../app';
import TeamModel from '../database/models/team';
import MatchModel from '../database/models/matches';
import UserModel from '../database/models/user';

chai.use(chaiHttp);
const { expect } = chai;

const validUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

describe('Match tests', () => {
  const matchesMock = [
    {
      id: 1,
      homeTeam: 1,
      homeTeamGoals: 1,
      awayTeam: 2,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: 'curingao',
      },
      teamAway: {
        teamName: 'parmera',
      }
    },
    {
      id: 2,
      homeTeam: 1,
      homeTeamGoals: 1,
      awayTeam: 3,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: 'curingao',
      },
      teamAway: {
        teamName: 'saopaolo',
      }
    },
  ];

  describe('GET /match route', () => {

    describe('GET /match main route', () => {
      beforeEach(() => { sinon.stub(MatchModel, 'findAll').resolves(matchesMock as unknown as MatchModel[]); });
      afterEach(() => { (MatchModel.findAll as sinon.SinonStub).restore() });

      it('should return a list of matches with a 200 status code', async () => {
        const response = await chai.request(app).get('/matches');

        expect(response.body).to.be.an('array');
        expect(response.status).to.be.equal(StatusCodes.OK);
      });
    });

    describe('GET /match?inProgress=true route', () => {
      beforeEach(() => { sinon.stub(MatchModel, 'findAll').resolves([matchesMock[0]] as unknown as MatchModel[]); });
      afterEach(() => { (MatchModel.findAll as sinon.SinonStub).restore() });

      it('should return a list of one match with a 200 status code', async () => {
        const response = await chai.request(app).get('/matches?inProgress=true');

        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.equal(1);
        expect(response.status).to.be.equal(StatusCodes.OK);
      });
    });

    describe('GET /match?inProgress=false route', () => {
      beforeEach(() => { sinon.stub(MatchModel, 'findAll').resolves([matchesMock[1]] as unknown as MatchModel[]); });
      afterEach(() => { (MatchModel.findAll as sinon.SinonStub).restore() });

      it('should return a list of one match with a 200 status code', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false');

        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.equal(1);
        expect(response.status).to.be.equal(StatusCodes.OK);
      });
    });
  });
});
