const { createContainer } = require('instances-container');

const { nanoid } = require('nanoid');
const brycpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Joi = require('joi');
const { Users, Funds, Donations } = require('../../models');

const RegisterRepository = require('../Domains/RegisterUsers/RegisterRepository');
const LoginUserRepository = require('../Domains/LoginUser/LoginUserRepository');
const UserRepository = require('../Domains/User/UserRepository');
const FundRepository = require('../Domains/Fund/FundRepository');
const DonationRepository = require('../Domains/Donations/DonationRepository');

const PasswordHash = require('../Aplications/Security/PasswordHash');
const TokenManager = require('../Aplications/Security/TokenManager');
const Validation = require('../Aplications/Validation/Validation');
const StorageServices = require('../Aplications/Storage/StorageServices');

const SequelizeRegisterRepository = require('./Repository/SequelizeRegisterRepository');
const SequelizeLoginUserRepository = require('./Repository/SequelizeLoginUserRepository');
const SequelizeUserRepository = require('./Repository/SequelizeUserRepository');
const SequelizeFundRepository = require('./Repository/SequelizeFundRepository');
const SequelizeDonationRepository = require('./Repository/SequelizeDonationRepository');

const BcryptPasswordhash = require('./Security/BcryptPasswordhash');
const JwtTokenManager = require('./Security/JwtTokenManager');
const JoiValidation = require('./JoiValidation/JoiValidation');
const LocalStorageServices = require('./LocalStorageServices/LocalStorageServices');

const RegisterUserUseCase = require('../Aplications/usecase/Register/RegisterUserUseCase');
const LoginUserUseCase = require('../Aplications/usecase/Login/LoginUserUseCase');
const GetAllUserUseCase = require('../Aplications/usecase/User/GetAllUserUseCase');
const DeleteUserByIdUseCase = require('../Aplications/usecase/User/DeleteUserByIdUseCase');
const AddFundUseCase = require('../Aplications/usecase/Fund/AddFundUseCase');
const GetAllFundUseCase = require('../Aplications/usecase/Fund/GetAllFundUseCase');
const DeleteFundByIdUseCase = require('../Aplications/usecase/Fund/DeleteFundByIdUseCase');
const GetFundByIdUseCase = require('../Aplications/usecase/Fund/GetFundByIdUseCase');
const EditFundByIdUseCase = require('../Aplications/usecase/Fund/EditFundByIdUseCase');
const AddDonationUseCase = require('../Aplications/usecase/Donations/AddDonationUseCase');
const SetStatusSuccessDonationUseCase = require('../Aplications/usecase/Donations/SetStatusSuccessDonationUseCase');
const GetDonationsByFundIdUseCase = require('../Aplications/usecase/Donations/GetDonationsByFundIdUseCase');

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
    key: DonationRepository.name,
    Class: SequelizeDonationRepository,
    parameter: {
      dependencies: [
        { concrete: nanoid },
        { concrete: Donations },
        { concrete: Users },
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
  {
    key: GetAllFundUseCase.name,
    Class: GetAllFundUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'fundRepository',
          internal: FundRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteFundByIdUseCase.name,
    Class: DeleteFundByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'fundRepository',
          internal: FundRepository.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
      ],
    },
  },
  {
    key: GetFundByIdUseCase.name,
    Class: GetFundByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'fundRepository',
          internal: FundRepository.name,
        },
      ],
    },
  },
  {
    key: EditFundByIdUseCase.name,
    Class: EditFundByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'fundRepostory',
          internal: FundRepository.name,
        },
        {
          name: 'validation',
          internal: Validation.name,
        },
        {
          name: 'storageService',
          internal: StorageServices.name,
        },
      ],
    },
  },
  {
    key: AddDonationUseCase.name,
    Class: AddDonationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'validation',
          internal: Validation.name,
        },
        {
          name: 'tokenManager',
          internal: TokenManager.name,
        },
        {
          name: 'storageService',
          internal: StorageServices.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'fundRepository',
          internal: FundRepository.name,
        },
        {
          name: 'donationsRepository',
          internal: DonationRepository.name,
        },
      ],
    },
  },
  {
    key: SetStatusSuccessDonationUseCase.name,
    Class: SetStatusSuccessDonationUseCase,
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
        {
          name: 'fundRepository',
          internal: FundRepository.name,
        },
        {
          name: 'donationsRepository',
          internal: DonationRepository.name,
        },
      ],
    },
  },
  {
    key: GetDonationsByFundIdUseCase.name,
    Class: GetDonationsByFundIdUseCase,
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
        {
          name: 'fundRepository',
          internal: FundRepository.name,
        },
        {
          name: 'donationsRepository',
          internal: DonationRepository.name,
        },
      ],
    },
  },
]);
module.exports = container;
