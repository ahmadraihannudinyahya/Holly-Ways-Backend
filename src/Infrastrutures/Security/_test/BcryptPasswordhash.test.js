const bcrypt = require('bcrypt');
const AuthenticationError = require('../../../Commons/Exceptions/AuthenticationError');
const BcryptPasswordhash = require('../BcryptPasswordhash');

describe('test BcryptPasswordhash', ()=>{
  describe('method hashPassword', ()=>{
    it('should return encripted password', async()=>{
      const password = 'thisIsPassword'
      const bcryptPasswordhash = new BcryptPasswordhash(bcrypt);
      const encriptedPassword = await bcryptPasswordhash.hashPassword(password);
      expect(encriptedPassword).not.toEqual(password);
    });
  });
  describe('method comparePassword', ()=>{
    it('should not throw AuthenticationError when password same', async ()=>{
      const password = 'thisIsPassword'
      const bcryptPasswordhash = new BcryptPasswordhash(bcrypt);
      const encriptedPassword = await bcryptPasswordhash.hashPassword(password);

      await expect(bcryptPasswordhash.comparePassword(password, encriptedPassword)).resolves.not.toThrowError();
    });
    it('should throw AuthenticationError when password not same', async ()=>{
      const password = 'thisIsPassword'
      const bcryptPasswordhash = new BcryptPasswordhash(bcrypt);
      const encriptedPassword = await bcryptPasswordhash.hashPassword(password);

      await expect(bcryptPasswordhash.comparePassword('wrong password', encriptedPassword)).rejects.toThrowError(AuthenticationError);  
    });
  });
});