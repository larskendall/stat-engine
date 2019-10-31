'use strict';

import app from '../..';
import { User } from '../../sqldb';
import request from 'supertest';
import supertestSession from 'supertest-session';
import { buildUser } from '../../test-util/sequelize-test-util';

describe('User API', function() {
  let user;

  before(async function() {
    await User.destroy({ where: {} });
    user = buildUser();
    await user.save();
  });

  after(async function() {
    await User.destroy({ where: {} });
  });

  describe('GET /api/users/me', function() {
    let session = null;

    before(async function() {
      session = supertestSession(app);

      const res = await session.post('/auth/local')
        .send({
          username: user.username,
          password: 'password',
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body.user).to.be.an('object');
      expect(res.body.user.username).to.equal(user.username);
    });

    it('should respond with a user profile when authenticated', async function() {
      const res = await session.get('/api/users/me');

      expect(res.statusCode).to.equal(200);
      expect(res.body.user).to.be.an('object');
      expect(res.body.user.username).to.equal(user.username);
    });

    it('should respond with a 401 when not authenticated', async function() {
      const res = await request(app).get('/api/users/me');
      expect(res.statusCode).to.equal(401);
    });
  });
});
