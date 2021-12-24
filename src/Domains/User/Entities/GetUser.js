class GetUser {
  constructor(payload) {
    const { id, fullname, email } = this.verifyPatload(payload);
    this.id = id;
    this.fullname = fullname;
    this.email = email;
  }

  verifyPatload({ id, fullname, email }) {
    if (!id || !fullname || !!email) {
      throw new Error('Get_User.Not_Contain_Data_Spesification');
    }
    if (typeof (id) !== 'string' || typeof (fullname) !== 'string' || typeof (email) !== 'string') {
      throw new Error('Get_User.Not_Meet_Data_Spesification');
    }
    return ({ id, fullname, email });
  }
}

module.exports = GetUser;
