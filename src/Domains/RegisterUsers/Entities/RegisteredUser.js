class RegisteredUser{
  constructor(payload){
    const {fullname, token} = this.verifyPayload(payload);
    this.fullname = fullname;
    this.token = token;
  }
  verifyPayload({fullname, token}){
    if(!fullname||!token){
      throw new Error('Registered_User.Not_Contain_Data_Spesification');
    }
    if(typeof(fullname)!=='string' ||typeof(token)!=='string'){
      throw new Error('Register_User.Not_Meet_Data_Spesification')
    }
    return({fullname, token});
  }
}