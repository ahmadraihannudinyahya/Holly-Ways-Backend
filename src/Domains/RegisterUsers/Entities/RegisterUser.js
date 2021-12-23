class RegisterUser{
  constructor(payload){
    const {email, password, fullname} = this.verifyPayload(payload);

    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.hashedPassword = null;
  }
  verifyPayload({email, password, fullname}){
    if(!email || !password || !fullname){
      throw new Error('Register_User.Not_Contain_Data_Spesification');
    }
    if(typeof(email)!=='string' || typeof(password)!== 'string' ||typeof(fullname)!=='string'){
      throw new Error('Register_User.Not_Meet_Data_Spesification')
    }
    return({email, password, fullname})
  }
}

module.exports = RegisterUser;