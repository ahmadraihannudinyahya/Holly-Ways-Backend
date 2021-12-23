class PasswordHash{
  async hashPassword(password){
    throw new Error('PasswordHash is abstract class');
  }
}