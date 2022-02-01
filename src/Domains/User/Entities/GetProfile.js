class GetProfile{
  constructor(payload){
    const { id, fullname, email, phone, image } = this.verifyPayload(payload);
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    if(image){
      this.image = `${process.env.HOST}${process.env.ENDPOINT_FILE}/${image}`;
    } else {
      this.image = null;
    }
  }
  verifyPayload({ id, fullname, email, phone = null , image = null}){
    if( !id || !fullname || !email ){
      throw new Error('GET_PROFILE.NOT_CONTAIN_DATA_NEEDED');
    };
    if( typeof(id) !== 'string' || typeof(fullname) !== 'string' || typeof(email) !== 'string'){
      throw new Error('GET_PROFILE.NOT_MEET_DATA_SPESIFICATION');
    };
    if(phone){
      if(typeof(phone) !== 'string'){
        throw new Error('GET_PROFILE.NOT_MEET_DATA_SPESIFICATION');
      };
    };
    if(image){
      if(typeof(image) !== 'string'){
        throw new Error('GET_PROFILE.NOT_MEET_DATA_SPESIFICATION');
      };
    };
    return({ id, fullname, email, phone, image });
  }
}
module.exports = GetProfile;