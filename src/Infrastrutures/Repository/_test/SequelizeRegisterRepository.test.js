const SequelizeRegisterRepository = require('../SequelizeRegisterRepository');
const { Users, Profiles } = require('../../../../models');
const RegisterUser = require('../../../Domains/RegisterUsers/Entities/RegisterUser');

const NotFoundError = require('../../../Commons/Exceptions/NotFoundError');

const UserTestHelper = require('../../../../test/UserTestHelper');

describe('SequelizeRegisterRepository test', () => {
  afterEach(async () => {
    await UserTestHelper.cleanTable();
  });
  describe('method addUser', () => {
    it('should return corectly id', async () => {
      const payload = {
        email: 'test@mail.com',
        password: 'supersecretpass',
        fullname: 'user test',
      };
      const fakeIdGenerator = () => '123';
      const registerUser = new RegisterUser(payload);
      const sequelizeRegisterRepository = new SequelizeRegisterRepository(Users, fakeIdGenerator, Profiles);
      const idUser = await sequelizeRegisterRepository.addUser(registerUser);
      expect(idUser).toEqual('user-123');
    });
    it('should add user corectly', async () => {
      const payload = {
        email: 'test@mail.com',
        password: 'supersecretpass',
        fullname: 'user test',
      };
      const fakeIdGenerator = () => '123';
      const registerUser = new RegisterUser(payload);
      const sequelizeRegisterRepository = new SequelizeRegisterRepository(Users, fakeIdGenerator, Profiles);
      const idUser = await sequelizeRegisterRepository.addUser(registerUser);
      const expectedUser = await UserTestHelper.getUserById(idUser);
      expect(expectedUser.fullname).toEqual(payload.fullname);
      expect(expectedUser.email).toEqual(payload.email);
      expect(expectedUser.password).toEqual(payload.password);
    });
    it('should add profile corectly', async () => {
      const payload = {
        email: 'test@mail.com',
        password: 'supersecretpass',
        fullname: 'user test',
      };
      const fakeIdGenerator = () => '123';
      const registerUser = new RegisterUser(payload);
      const sequelizeRegisterRepository = new SequelizeRegisterRepository(Users, fakeIdGenerator, Profiles);
      const idUser = await sequelizeRegisterRepository.addUser(registerUser);
      const expectedProfile = await UserTestHelper.getProfileByUserId(idUser);
      expect(expectedProfile.profile).not.toEqual(null);
      expect(expectedProfile.profile.id).toEqual('profile-123');
      expect(expectedProfile.profile.userId).toEqual(idUser);
    });
  });
  describe('method verifyAvailableEmail', () => {
    it('should not to throw error when email no found in database', async () => {
      const email = 'test@mail.com';
      const sequelizeRegisterRepository = new SequelizeRegisterRepository(Users);
      await expect(sequelizeRegisterRepository.verifyAvailableEmail(email)).resolves.not.toThrowError();
    });
    it('should throw not found error when email found in database', async () => {
      const email = 'test@mail.com';
      await UserTestHelper.addUser({ email });
      const sequelizeRegisterRepository = new SequelizeRegisterRepository(Users);
      await expect(sequelizeRegisterRepository.verifyAvailableEmail(email)).rejects.toThrowError(NotFoundError);
    });
  });
});
