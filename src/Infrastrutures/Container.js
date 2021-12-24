const { createContainer } = require('instances-container');

const { nanoid } = require('nanoid');
const brycpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Joi = require('joi');
const { Users, Funds } = require('../../models');

const RegisterRepository = require('../Domains/RegisterUsers/RegisterRepository');
const LoginUserRepository = require('../Domains/LoginUser/LoginUserRepository');
const UserRepository = require('../Domains/User/UserRepository');
const FundRepository = require('../Domains/Fund/FundRepository');

const PasswordHash = require('../Aplications/Security/PasswordHash');
const TokenManager = require('../Aplications/Security/TokenManager');
const Validation = require('../Aplications/Validation/Validation');
const StorageServices = require('../Aplications/Storage/StorageServices');

const SequelizeRegisterRepository = require('./Repository/SequelizeRegisterRepository');
const SequelizeLoginUserRepository = require('./Repository/SequelizeLoginUserRepository');
const SequelizeUserRepository = require('./Repository/SequelizeUserRepository');
const SequelizeFundRepository = require('./Repository/SequelizeFundRepository');

const BcryptPasswordhash = require('./Security/BcryptPasswordhash');
const JwtTokenManager = require('./Security/JwtTokenManager');
const JoiValidation = require('./JoiValidation/JoiValidation');
const LocalStorageServices = require('./LocalStorageServices/LocalStorageServices');

const RegisterUserUseCase = require('../Aplications/usecase/Register/RegisterUserUseCase');
const LoginUserUseCase = require('../Aplications/usecase/Login/LoginUserUseCase');
const GetAllUserUseCase = require('../Aplications/usecase/User/GetAllUserUseCase');
const DeleteUserByIdUseCase = require('../Aplications/usecase/User/DeleteUserByIdUseCase');
const AddFundUseCase = require('../Aplications/usecase/Fund/AddFundUseCase');

const container = createContainer();

container.register([
  {
    key: RegisterRepository.name,
    Class: SequelizeRegisterRepository,
    parameter: {
      dependencies: [
        { concrete: Users },
        { concrete: nanoid },
      ],
    },
  },
  {
    key: LoginUserRepository.name,
    Class: SequelizeLoginUserRepository,
    parameter: {
      dependencies: [
        { concrete: Users },
      ],
    },
  },
  {
    key: UserRepository.name,
    Class: SequelizeUserRepository,
    parameter: {
      dependencies: [
        { concrete: Users },
      ],
    },
  },
  {
    key: FundRepository.name,
    Class: SequelizeFundRepository,
    parameter: {
      dependencies: [
        { concrete: Funds },
        { concrete: nanoid },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordhash,
    parameter: {
      dependencies: [
        { concrete: brycpt },
      ],
    },
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        { concrete: jwt },
      ],
    },
  },
  {
    key: Validation.name,
    Class: JoiValidation,
    parameter: {
      dependencies: [
        { concrete: Joi },
      ],
    },
  },
  {
    key: StorageServices.name,
    Class: LocalStorageServices,
  },
]);

container.register([
  {
    key: RegisterUserUseCase.name,
    Class: RegisterUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'registerRepository',
          internal: RegisterRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'validation',
          internal: Validation.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'loginUserRepository',
          internal: LoginUserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'validation',
          internal: Validation.name,
        },
      ],
    },
  },
  {
    key: GetAllUserUseCase.name,
    Class: GetAllUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteUserByIdUseCase.name,
    Class: DeleteUserByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: AddFundUseCase.name,
    Class: AddFundUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'validation',
          internal: Validation.name,
        },
        {
          name: 'storageService',
          internal: StorageServices.name,
        },
        {
          name: 'fundRepository',
          internal: FundRepository.name,
        },
      ],
    },
  },
]);
module.exports = container;
