class LoginUser{
  constructor(payload){
    const {email, password} =this.verifyPayload(payload);
    this.email = email;
    this.password =password;
  }
  verifyPayload({email, password}){
    if(!email || !password){
      throw new Error('Login_User.Not_Contain_Data_Spesification');
    }
    if(typeof(email)!== 'string' || typeof(password)!=='string'){
      throw new Error('Login_User.Not_Meet_Data_Spesification');
    }
    return({email, password});
  }
  set id(userId){
    this.userId = userId;
  }
}

module.exports = LoginUser;