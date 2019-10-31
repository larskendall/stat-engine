'use strict';

import { User } from '../../sqldb';
import { buildUser } from '../../test-util/sequelize-test-util';

let user;

describe('User Model', function() {
  before(async function() {
    await User.destroy({ where: {} });
  });

  afterEach(async function() {
    await User.destroy({ where: {} });
    user = undefined;
  });

  it('should begin with no users', async function() {
    const users = await User.findAll();
    expect(users).to.have.length(0);
  });

  it('should fail when saving a duplicate user', async function() {
    user = buildUser();
    await user.save();
    const dupeUser = buildUser();
    await expect(dupeUser.save()).to.be.rejected;
  });

  describe('email', function() {
    it('should fail when saving without an email', async function() {
      user = buildUser({ email: '' });
      await expect(user.save()).to.be.rejected;
    });
  });

  describe('password', function() {
    beforeEach(async function() {
      user = buildUser();
      user = await user.save();
    });

    it('should authenticate user if valid', async function() {
      expect(user.authenticate('password')).to.be.true;
    });

    it('should not authenticate user if invalid', async function() {
      expect(user.authenticate('blah')).to.not.be.true;
    });
  });
});
