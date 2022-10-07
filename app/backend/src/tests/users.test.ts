import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { StatusCodes } from 'http-status-codes';
import { app } from '../app';
import UserModel from '../database/models/user';

chai.use(chaiHttp);
const { expect } = chai;

describe('User/login tests', () => {

  describe('POST /login route', () => {
    const userMock = {
      email: 'emailemail@email.com',
      password: 'password',
    };

    describe('when the user is valid', () => {

      beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel)});
      afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});

      it('should return a token with a 200 status code', async () => {
        const response = await chai.request(app).post('/login').send(userMock)

        expect(response.body).to.have.property('token');
        expect(response.status).to.be.equal(StatusCodes.OK);
      });
    });

    describe('when the user is invalid', () => {
      describe('with invalid email', () => {
        const invalidEmailMock = {
          email: 'invalidemail',
          password: 'password',
        };

        beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(null)});
        afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});

        it('should return an error with a 401 status code', async () => {
          const response = await chai.request(app).post('/login').send(invalidEmailMock)

          expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
        });
      });

      describe('with invalid password', () => {
        const invalidPassMock = {
          email: 'email@email.com',
          password: 'pass',
        };

        beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(null)});
        afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});

        it('should return an error with a 401 status code', async () => {
          const response = await chai.request(app).post('/login').send(invalidPassMock)

          expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
        });
      });

      describe('without email', () => {
        const noEmailMock = { password: 'password' };

        beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(noEmailMock as UserModel)});
        afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});

        it('should return an error with a 400 status code', async () => {
          const response = await chai.request(app).post('/login').send(noEmailMock)

          expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });
      });

      describe('without password', () => {
        const noPassMock = { email: 'emailemail@email.com' };

        beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(noPassMock as UserModel)});
        afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});

        it('should return an error with a 400 status code', async () => {
          const response = await chai.request(app).post('/login').send(noPassMock)

          expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });
      });

    });
  })

  describe('GET /login/validate route', () => {

    describe('when the token is valid', () => {
      const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY1MTgzMjkwLCJleHAiOjE2NjU3ODgwOTB9.nLRQh0ZHLT8JoYzARmCcalg6vCIqpYFJiZWcVJbdBSM';
      const validUserMock = {
        id: 2,
        username: 'User',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        role: 'user'
      };

      beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(validUserMock as unknown as UserModel)});
      afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});

      it('should return a 200 status code', async () => {
        const response = await chai.request(app).get('/login/validate').set('authorization', tokenMock)

        expect(response.status).to.be.equal(StatusCodes.OK);
      });
    });

    describe('when the token is invalid', () => {

      describe('with not found token', () => {
        const invalidTokenMock = 'invalidToken';
        const validUserMock = {
          id: 2,
          username: 'User',
          email: 'user@user.com',
          password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
          role: 'user'
        };
  
        beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(validUserMock as unknown as UserModel)});
        afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});
  
        it('should return a 401 status code', async () => {
          const response = await chai.request(app).get('/login/validate').set('authorization', invalidTokenMock)
  
          expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
        });
      });

      describe('with there is no token', () => {
        const validUserMock = {
          id: 2,
          username: 'User',
          email: 'user@user.com',
          password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
          role: 'user'
        };
  
        beforeEach(() => {sinon.stub(UserModel, 'findOne').resolves(validUserMock as unknown as UserModel)});
        afterEach(() => {(UserModel.findOne as sinon.SinonStub).restore()});
  
        it('should return a 401 status code', async () => {
          const response = await chai.request(app).get('/login/validate');
  
          expect(response.status).to.be.equal(StatusCodes.UNAUTHORIZED);
        });
      });
    });
  })
});