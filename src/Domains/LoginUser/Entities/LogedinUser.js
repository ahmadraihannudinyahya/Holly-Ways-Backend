class LogedinUser{
  constructor(payload){
    const {fullname, email, token} = this.verifyPayload(payload);
    this.fullname = fullname;
    this.email = email;
    this.token = token;
  }
  verifyPayload({fullname, email, token}){
    if(!fullname || !email||!token){
      throw new Error('Logedin_User.Not_Contain_Data_Spesification');
    }
    if(typeof(fullname)!=='string'||typeof(email)!=='string'||typeof(token)!=='string'){
      throw new Error('Logedin_User.Not_Meet_Data_Spesification');
    }
    return({fullname, email, token});
  }
}

module.exports = LogedinUser;