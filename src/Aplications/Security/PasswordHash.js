class PasswordHash{
  async hashPassword(password){
    throw new Error('PasswordHash is abstract class');
  }
  async comparePassword(){
    throw new Error('PasswordHash is abstract class');
  }
}
module.exports=PasswordHash;