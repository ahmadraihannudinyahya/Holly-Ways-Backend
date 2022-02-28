const { Donations, Funds } = require('../../../../models');
const SequelizeFundRepository = require('../SequelizeFundRepository');

const NewFund = require('../../../Domains/Fund/Entities/NewFund');
const UserTestHelper = require('../../../../test/UserTestHelper');
const FundTestHelper = require('../../../../test/FundTestHelper');
const AuthorizationError = require('../../../Commons/Exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/Exceptions/NotFoundError');
const InvariantError = require('../../../Commons/Exceptions/InvariantError');

describe('test SequelizeFundRepository', () => {
  const user = {
    email: 'user@mail.com',
    password: 'supersecretpass',
    fullname: 'user test',
    id: 'user-123',
  };
  beforeAll(async () => {
    await UserTestHelper.addUser(user);
  });
  afterAll(async () => {
    await UserTestHelper.cleanTable();
  });
  afterEach(async () => {
    await FundTestHelper.cleanTable();
  });
  describe('method addFund', () => {
    it('should return id corectly', async () => {
      const payload = {
        title: 'test fund title',
        description: 'test description',
        goal: 10000000,
        owner: user.id,
      };
      const newFund = new NewFund(payload);
      const fakeIdGenerator = () => '123';
      const sequelizeFundRepository = new SequelizeFundRepository(Funds, fakeIdGenerator);
      const fundId = await sequelizeFundRepository.addFund(newFund);
      expect(fundId).toEqual('fund-123');
    });
    it('should add fund corectly', async () => {
      const payload = {
        title: 'test fund title',
        description: 'test description',
        goal: 10000000,
        owner: user.id,
      };
      const newFund = new NewFund(payload);
      const fakeIdGenerator = () => '123';
      const sequelizeFundRepository = new SequelizeFundRepository(Funds, fakeIdGenerator);
      const fundId = await sequelizeFundRepository.addFund(newFund);
      const expectedAddedFund = await FundTestHelper.getFundById(fundId);
      expect(expectedAddedFund.title).toEqual(payload.title);
      expect(expectedAddedFund.description).toEqual(payload.description);
      expect(expectedAddedFund.goal).toEqual(payload.goal);
      expect(expectedAddedFund.owner).toEqual(payload.owner);
      expect(expectedAddedFund.status).toEqual('open');
    });
  });
  describe('method getAllFund', () => {
    const fund1 = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };

    const fund2 = {
      id: 'fund-124',
      title: 'test fund 2 title',
      description: 'test 2 description',
      goal: 10000000,
      owner: user.id,
    };

    beforeEach(async () => {
      await FundTestHelper.addFund(fund1);
      await FundTestHelper.addFund(fund2);
    });
    it('should get all fund corectly', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      const expectedFunds = await sequelizeFundRepository.getAllFund();
      expect(expectedFunds).toHaveLength(2);
      expect(expectedFunds[0].id).toEqual(fund1.id);
      expect(expectedFunds[0].title).toEqual(fund1.title);
      expect(expectedFunds[0].description).toEqual(fund1.description);
      expect(expectedFunds[0].goal).toEqual(fund1.goal);
      expect(expectedFunds[0].owner).toEqual(fund1.owner);
      expect(expectedFunds[1].id).toEqual(fund2.id);
      expect(expectedFunds[1].title).toEqual(fund2.title);
      expect(expectedFunds[1].description).toEqual(fund2.description);
      expect(expectedFunds[1].goal).toEqual(fund2.goal);
      expect(expectedFunds[1].owner).toEqual(fund2.owner);
    });
  });
  describe('method verifyFundOwner', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should not throw error when fund is owner', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await expect(sequelizeFundRepository.verifyFundOwner(testFund.id, user.id)).resolves.not.toThrowError();
    });
    it('should to throw error when fund not owner', async () => {
      const newUser = {
        id: 'user-111',
      };
      await UserTestHelper.addUser(newUser);
      const newFund = {
        id: 'fund-324',
        owner: newUser.id,
      };
      await FundTestHelper.addFund(newFund);
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await expect(sequelizeFundRepository.verifyFundOwner(newFund.id, user.id)).rejects.toThrowError(AuthorizationError);
    });
  });
  describe('method deleteFundById', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should soft delete fund corectly', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await sequelizeFundRepository.deleteFundById(testFund.id);
      const expectedFund = await FundTestHelper.getFundById(testFund.id);
      expect(expectedFund).toBeDefined();
      expect(expectedFund.status).toEqual('closed');
    });
  });
  describe('method verifyFundFound', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should not throw error when fund found in database', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await expect(sequelizeFundRepository.verifyFundFound(testFund.id)).resolves.not.toThrowError();
    });
    it('should throw not found error when fund not found in database', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await expect(sequelizeFundRepository.verifyFundFound('not-found-fundid')).rejects.toThrowError(NotFoundError);
    });
  });
  describe('method getFundById', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should return object fund corectly', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      const expectedFund = await sequelizeFundRepository.getFundById(testFund.id);
      expect(expectedFund.title).toEqual(testFund.title);
      expect(expectedFund.description).toEqual(testFund.description);
      expect(expectedFund.goal).toEqual(testFund.goal);
      expect(expectedFund.owner).toEqual(testFund.owner);
      expect(expectedFund.status).toEqual('open');
    });
  });
  describe('method editFundById', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should edited fund corectly', async () => {
      const editPayload = {
        id: testFund.id,
        title: 'edited Title',
        goal: 40000000,
      };
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await sequelizeFundRepository.editFundById(editPayload);
      const expectedFund = await FundTestHelper.getFundById(testFund.id);
      expect(expectedFund.title).toEqual(editPayload.title);
      expect(expectedFund.description).toEqual(testFund.description);
      expect(expectedFund.goal).toEqual(editPayload.goal);
    });
  });
  describe('method getFundsByOwner', () => {
    newUser = {
      id: 'user-456',
    };

    const fund1 = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };

    const fund2 = {
      id: 'fund-124',
      title: 'test fund 2 title',
      description: 'test 2 description',
      goal: 10000000,
      owner: newUser.id,
    };

    beforeEach(async () => {
      await UserTestHelper.addUser(newUser);
      await FundTestHelper.addFund(fund1);
      await FundTestHelper.addFund(fund2);
    });
    it('should return fund by owner corectly', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      const expectedFunds = await sequelizeFundRepository.getFundsByOwner(newUser.id);
      expect(expectedFunds).toHaveLength(1);
      expect(expectedFunds[0].title).toEqual(fund2.title);
      expect(expectedFunds[0].description).toEqual(fund2.description);
      expect(expectedFunds[0].goal).toEqual(fund2.goal);
      expect(expectedFunds[0].status).toEqual('open');
    });
  });
  describe('method getAllFundsWithDonations', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should return all funds in database with donations', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds, {}, Donations);
      const expectedFunds = await sequelizeFundRepository.getAllFundsWithDonations();
      expect(expectedFunds).toHaveLength(1);
      expect(expectedFunds[0].id).toEqual(testFund.id);
      expect(expectedFunds[0].title).toEqual(testFund.title);
      expect(expectedFunds[0].description).toEqual(testFund.description);
      expect(expectedFunds[0].goal).toEqual(testFund.goal);
      expect(expectedFunds[0].owner).toEqual(testFund.owner);
    });
  });
  describe('method getFundsByIdWithDonations', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should return object fund with donations corectly', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds, {}, Donations);
      const expectedFunds = await sequelizeFundRepository.getFundsByIdWithDonations(testFund.id);
      expect(expectedFunds.title).toEqual(testFund.title);
      expect(expectedFunds.description).toEqual(testFund.description);
      expect(expectedFunds.goal).toEqual(testFund.goal);
      expect(expectedFunds.owner).toEqual(testFund.owner);
    });
  });
  describe('method getFundsByOwnerWithDonations', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should return array of object fund with donations corectly', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds, {}, Donations);
      const expectedFunds = await sequelizeFundRepository.getFundsByOwnerWithDonations(user.id);
      expect(expectedFunds).toHaveLength(1);
      expect(expectedFunds[0].id).toEqual(testFund.id);
      expect(expectedFunds[0].title).toEqual(testFund.title);
      expect(expectedFunds[0].description).toEqual(testFund.description);
      expect(expectedFunds[0].goal).toEqual(testFund.goal);
      expect(expectedFunds[0].owner).toEqual(testFund.owner);
    });
  });
  describe('method verifyFundStatusOpenById', () => {
    const testFund = {
      id: 'fund-123',
      title: 'test fund 1 title',
      description: 'test 1 description',
      goal: 10000000,
      owner: user.id,
    };
    beforeEach(async () => {
      await FundTestHelper.addFund(testFund);
    });
    it('should not throw error when fund status open', async () => {
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await expect(sequelizeFundRepository.verifyFundStatusOpenById(testFund.id)).resolves.not.toThrowError();
    });
    it('should throw InvariantError when fund status is closed', async () => {
      await FundTestHelper.setFundCloseById(testFund.id);
      const sequelizeFundRepository = new SequelizeFundRepository(Funds);
      await expect(sequelizeFundRepository.verifyFundStatusOpenById(testFund.id)).rejects.toThrowError(InvariantError);
    });
  });
});
