const {createContainer} = require('instances-container');

const { nanoid } = require('nanoid');
const brycpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {Users} = require('../../models');

const RegisterRepository = require('../Domains/RegisterUsers/RegisterRepository')

const PasswordHash = require('../Aplications/Security/PasswordHash');
const TokenManager = require('../Aplications/Security/TokenManager');
const Validation = require('../Aplications/Validation/Validation');

const SequelizeRegisterRepository = require('./Repository/SequelizeRegisterRepository');

const BcryptPasswordhash = require('./Security/BcryptPasswordhash');
const JwtTokenManager = require('./Security/JwtTokenManager');
const JoiValidation = require('./JoiValidation/JoiValidation');

const RegisterUserUseCase = require('../Aplications/usecase/Register/RegisterUserUseCase');
const container = createContainer();

container.register([
  {
    key : RegisterRepository.name,
    Class : SequelizeRegisterRepository,
    parameter : {
      dependencies :[
        {concrete : Users},
        {concrete : nanoid}
      ]
    }
  },
  {
    key : PasswordHash.name,
    Class : BcryptPasswordhash,
    parameter : {
      dependencies :[
        {concrete : brycpt}
      ]
    }
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
    parameter : {
      dependencies : [
        {concrete : jwt}
      ]
    }
  },
  {
    key : Validation.name,
    Class : JoiValidation,
  }
]);

container.register([
  {
    key : RegisterUserUseCase.name,
    Class : RegisterUserUseCase,
    parameter : {
      injectType : 'destructuring',
      dependencies : [
        {
          name : 'registerRepository',
          internal : RegisterRepository.name,
        },
        {
          name : 'passwordHash',
          internal : PasswordHash.name
        },
        {
          name : 'tokenManager',
          internal : TokenManager.name
        },
        {
          name : 'validation',
          internal:Validation.name
        },
      ]
    }
  }
])
module.exports = container;