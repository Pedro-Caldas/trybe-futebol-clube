import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { StatusCodes } from 'http-status-codes';
import HomeLeaderboardService from '../services/HomeLeaderboardService';
import AwayLeaderboardService from '../services/AwayLeaderboardService';
import LeaderboardService from '../services/LeaderboardService';

chai.use(chaiHttp);
const { expect } = chai;

const homeLeaderboardService = new HomeLeaderboardService();
const awayLeaderboardService = new AwayLeaderboardService();
const leaderboardService = new LeaderboardService();

import {
  homeLeaderboard,
  awayLeaderboard,
  leaderboard,
} from './testsMocks/leaderboardMocks';
import ILeaderboard from '../interfaces/ILeaderboard';

describe('Leaderboard tests', () => {
  describe('GET /leaderboard/home route', () => {

    beforeEach(() => {sinon.stub(homeLeaderboardService, 'getHomeLeaderboard').resolves(homeLeaderboard as unknown as ILeaderboard[]);});
    afterEach(() => {
      (homeLeaderboardService.getHomeLeaderboard as sinon.SinonStub).restore();
    });

    it('should return 200 status code with home leaderbord array', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.body).to.deep.equal(homeLeaderboard);
      expect(response.status).to.equal(StatusCodes.OK);
    });
  });

  describe('GET /leaderboard/away route', () => {
    beforeEach(() => {sinon.stub(awayLeaderboardService, 'getAwayLeaderboard').resolves(awayLeaderboard as unknown as ILeaderboard[]);});
    afterEach(() => {
      (awayLeaderboardService.getAwayLeaderboard as sinon.SinonStub).restore();
    });

    it('should return 200 status code with away leaderbord array', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.body).to.deep.equal(awayLeaderboard);
      expect(response.status).to.equal(StatusCodes.OK);
    });
  });

  describe('GET /leaderboard route', () => {
    beforeEach(() => {sinon.stub(leaderboardService, 'getSortedLeaderboard').resolves(leaderboard as unknown as ILeaderboard[]);});
    afterEach(() => {
      (leaderboardService.getSortedLeaderboard as sinon.SinonStub).restore();
    });

    it('should return 200 status code with leaderbord array', async () => {
      const response = await chai.request(app).get('/leaderboard');
      expect(response.body).to.deep.equal(leaderboard);
      expect(response.status).to.equal(StatusCodes.OK);
    });
  });
});