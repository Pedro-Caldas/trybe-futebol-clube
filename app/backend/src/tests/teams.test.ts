import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';
import { app } from '../app';
import TeamModel from '../database/models/team';

chai.use(chaiHttp);
const { expect } = chai;

describe('Team GET / tests', () => {
  const teams = [
    {
      id: 1,
      teamName: 'curingão',
    },
    {
      id: 2,
      teamName: 'parmera',
    },
  ];

  beforeEach(() => {sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[])});
  afterEach(() => {(TeamModel.findAll as sinon.SinonStub).restore()});
  
  it('should return all teams', async () => {
    const response = await chai.request(app).get('/teams');

    expect(response.body).to.be.an('array');
    expect(response.status).to.be.equal(StatusCodes.OK);
  });
});

describe('Team GET /:id tests', () => {
  const team = {
    id: 1,
    teamName: 'curingão',
  };

  beforeEach(() => {sinon.stub(TeamModel, 'findOne').resolves(team as TeamModel)});
  afterEach(() => {(TeamModel.findOne as sinon.SinonStub).restore()});
  
  it('should return a team', async () => {
    const response = await chai.request(app).get('/teams/1');

    expect(response.body).to.be.an('object');
    expect(response.status).to.be.equal(StatusCodes.OK);
  });
});