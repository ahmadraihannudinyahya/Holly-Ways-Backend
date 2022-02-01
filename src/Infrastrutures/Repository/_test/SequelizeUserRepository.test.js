const {Users, Profiles} = require('../../../../models');
const NotFoundError = require('../../../Commons/Exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/Exceptions/AuthorizationError');
const SequelizeUserRepository = require('../SequelizeUserRepository');

const UserTestHelper = require('../../../../test/UserTestHelper');

describe('test SequelizeUserRepository', ()=>{
  const user = {
    email : 'user@mail.com',
    password : 'supersecretpass',
    fullname : 'user test',
    id : 'user-123'
  }
  beforeEach(async ()=>{
    await UserTestHelper.addUser(user);
  });
  afterEach(async ()=>{
    await UserTestHelper.cleanTable();
  });
  describe('method getAllUsers', ()=>{
    it('should return array of object user registered', async ()=>{
      const sequelizeUserRepository = new SequelizeUserRepository(Users);
      const usersRegisterd = await sequelizeUserRepository.getAllUsers();
      expect(usersRegisterd).toHaveLength(1);
      expect(usersRegisterd[0].id).toEqual(user.id); 
      expect(usersRegisterd[0].email).toEqual(user.email); 
      expect(usersRegisterd[0].password).toEqual(user.password); 
      expect(usersRegisterd[0].fullname).toEqual(user.fullname); 
    });
  });
  describe('method deleteUserById', ()=>{
    it('should delete user corectly', async()=>{
      const sequelizeUserRepository = new SequelizeUserRepository(Users, Profiles);
      await sequelizeUserRepository.deleteUserById(user.id);
      const userDeleted = await UserTestHelper.getUserById(user.id);
      expect(userDeleted).toEqual(null);
    });
  });
  describe('method verifyUserDeleteSelf',()=>{
    it('should not throw error when deleteUser === logedinUser', async ()=>{
      const sequelizeUserRepository = new SequelizeUserRepository();
      await expect(sequelizeUserRepository.verifyUserDeleteSelf(user.id, user.id)).resolves.not.toThrowError();
    });
    it('should throw AuthorizationError when deleteUser !== logedinUser', async ()=>{
      const sequelizeUserRepository = new SequelizeUserRepository();
      await expect(sequelizeUserRepository.verifyUserDeleteSelf(user.id, 'ilegal-login-user')).rejects.toThrowError(AuthorizationError);
    });
  });
  describe('method verifyUserFound', ()=>{
    it('should not throw error when user found in database', async()=>{
      const sequelizeUserRepository = new SequelizeUserRepository(Users);
      await expect(sequelizeUserRepository.verifyUserFound(user.id)).resolves.not.toThrowError();
    });
    it('should throw error when user not found in database', async()=>{
      const sequelizeUserRepository = new SequelizeUserRepository(Users);
      await expect(sequelizeUserRepository.verifyUserFound('unregister-user-id')).rejects.toThrowError(NotFoundError);
    });
  });
  describe('method getUserById', ()=>{
    it('should return user object corectly', async()=>{
      const sequelizeUserRepository = new SequelizeUserRepository(Users);
      const usersRegisterd = await sequelizeUserRepository.getUserById(user.id);
      expect(usersRegisterd.fullname).toEqual(user.fullname);
      expect(usersRegisterd.password).toEqual(user.password);
      expect(usersRegisterd.email).toEqual(user.email);
    });
  });
  describe('method editProfile', () => {
    it('should edit profile corectly with fullname', async () => {
      const payload = {
        fullname : 'edited user',
        phone : '087652478', 
      };
      const userId = user.id;
      const sequelizeUserRepository = new SequelizeUserRepository(Users, Profiles);
      await sequelizeUserRepository.editProfile(payload, userId);
      const expectedProfile = await UserTestHelper.getProfileByUserId(userId);
      expect(expectedProfile.fullname).toEqual(payload.fullname);
      expect(expectedProfile.profile.phone).toEqual(payload.phone);
    });
    it('should edit profile corectly with fullname', async () => {
      const payload = {
        image : 'image283828.jpg', 
        phone : '087652478', 
      };
      const userId = user.id;
      const sequelizeUserRepository = new SequelizeUserRepository(Users, Profiles);
      await sequelizeUserRepository.editProfile(payload, userId);
      const expectedProfile = await UserTestHelper.getProfileByUserId(userId);
      expect(expectedProfile.profile.image).toEqual(payload.image);
      expect(expectedProfile.profile.phone).toEqual(payload.phone);
    });
  });
  describe('method get profile', () => {
    it('should get profile corectly', async () => {
      const sequelizeUserRepository = new SequelizeUserRepository(Users, Profiles);
      const expectedProfile = await sequelizeUserRepository.getProfile(user.id);
      expect(expectedProfile.fullname).toEqual(user.fullname);
      expect(expectedProfile.password).toEqual(user.password);
      expect(expectedProfile.email).toEqual(user.email);
      expect(expectedProfile.phone).toEqual(null);
      expect(expectedProfile.image).toEqual(null);
    });
  });
});