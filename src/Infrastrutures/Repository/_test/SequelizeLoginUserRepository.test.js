const { Users } = require('../../../../models');
const NotFoundError = require('../../../Commons/Exceptions/NotFoundError');
const SequelizeLoginUserRepository = require('../SequelizeLoginUserRepository');

const UserTestHelper = require('../../../../test/UserTestHelper');

describe('test SequelizeLoginUserRepository', () => {
  const user = {
    email: 'user@mail.com',
    password: 'supersecretpass',
    fullname: 'user test',
    id: 'user-123',
  };
  beforeAll(async () => {
    await UserTestHelper.addUser(user);
  });
  afterAll(async () => {
    await UserTestHelper.cleanTable();
  });
  describe('method verifyUserByEmail', () => {
    it('should not throw error when email found in database', async () => {
      const sequelizeLoginUserRepository = new SequelizeLoginUserRepository(Users);
      await expect(sequelizeLoginUserRepository.verifyUserByEmail(user.email)).resolves.not.toThrowError();
    });
    it('should throw not found error when email not found in database', async () => {
      const sequelizeLoginUserRepository = new SequelizeLoginUserRepository(Users);
      await expect(sequelizeLoginUserRepository.verifyUserByEmail('unregister@mail.com')).rejects.toThrowError(NotFoundError);
    });
  });
  describe('method getUserByEmail', () => {
    it('should return user corectly', async () => {
      const sequelizeLoginUserRepository = new SequelizeLoginUserRepository(Users);
      const registeredUser = await sequelizeLoginUserRepository.getUserByEmail(user.email);
      expect(registeredUser.password).toEqual(user.password);
      expect(registeredUser.fullname).toEqual(user.fullname);
      expect(registeredUser.id).toEqual(user.id);
    });
  });
});
