class EditProfile{
  constructor(payload){
    const { fullname, phone, image } = this.verifPayload(payload);
    this.fullname = fullname;
    this.phone = phone;
    this.image = image;
  }
  verifPayload({ fullname, phone, image }){
    if(fullname){
      if(typeof(fullname) !== 'string'){
        throw new Error('EDIT_PROFILE.NOT_MEET_DATA_SPESIFICATION');
      };
    };
    if(phone){
      if(typeof(phone) !== 'string'){
        throw new Error('EDIT_PROFILE.NOT_MEET_DATA_SPESIFICATION');
      };
    };
    if(image){
      if(typeof(image) !== 'string'){
        throw new Error('EDIT_PROFILE.NOT_MEET_DATA_SPESIFICATION');
      }
    }
    return({ fullname, phone, image })
  }
}
module.exports = EditProfile;