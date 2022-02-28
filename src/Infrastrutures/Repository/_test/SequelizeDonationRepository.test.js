const SequelizeDonationRepository = require('../SequelizeDonationRepository');
const UserTestHelper = require('../../../../test/UserTestHelper');
const FundTestHelper = require('../../../../test/FundTestHelper');
const DonationTestHelper = require('../../../../test/DonationTestHelper');

const { Donations, Users, Funds } = require('../../../../models');
const NotFoundError = require('../../../Commons/Exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/Exceptions/AuthorizationError');

describe('test SequelizeDonationRepository', () => {
  const userTest1 = {
    id: 'user-111',
  };
  const userTest2 = {
    id: 'user-222',
  };
  const fundTest1 = {
    id: 'fund-111',
    owner: userTest1.id,
  };
  const fundTest2 = {
    id: 'fund-222',
    owner: userTest2.id,
  };
  beforeAll(async () => {
    await UserTestHelper.addUser(userTest1);
    await FundTestHelper.addFund(fundTest1);
    await UserTestHelper.addUser(userTest2);
    await FundTestHelper.addFund(fundTest2);
  });
  afterAll(async () => {
    await FundTestHelper.cleanTable();
    await UserTestHelper.cleanTable();
  });
  afterEach(async () => {
    await DonationTestHelper.cleanTable();
  });
  describe('method addDonations', () => {
    it('should return id corectly', async () => {
      const payload = {
        fundId: fundTest2.id,
        donateAmount: 100_000,
        proofAttachment: 'image.png',
        userId: userTest2.id,
      };
      const fakeIdGenerator = () => '123';
      const sequelizeDonationRepository = new SequelizeDonationRepository(fakeIdGenerator, Donations);
      const idDonaton = await sequelizeDonationRepository.addDonations(payload);
      expect(idDonaton).toEqual('donation-123');
    });
    it('should add donation corectly', async () => {
      const payload = {
        fundId: fundTest2.id,
        donateAmount: 100_000,
        proofAttachment: 'image.png',
        userId: userTest2.id,
      };
      const fakeIdGenerator = () => '123';
      const sequelizeDonationRepository = new SequelizeDonationRepository(fakeIdGenerator, Donations);
      const idDonaton = await sequelizeDonationRepository.addDonations(payload);
      const expectedDonation = await DonationTestHelper.getDonationById(idDonaton);
      expect(expectedDonation.donateAmount).toEqual(payload.donateAmount);
      expect(expectedDonation.proofAttachment).toEqual(payload.proofAttachment);
      expect(expectedDonation.fundId).toEqual(payload.fundId);
      expect(expectedDonation.userId).toEqual(payload.userId);
      expect(expectedDonation.status).toEqual('pending');
    });
  });
  describe('method setStatusSuccessDonation', () => {
    const donationTest = {
      id: 'donation-199',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest);
    });
    it('should change status donation corectly', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      await sequelizeDonationRepository.setStatusSuccessDonation(donationTest.id);
      const expectedDonation = await DonationTestHelper.getDonationById(donationTest.id);
      expect(expectedDonation.status).toEqual('success');
    });
  });
  describe('method verifyDonationFound', () => {
    const donationTest = {
      id: 'donation-199',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest);
    });
    it('should not throw error when donation found in database', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      await expect(sequelizeDonationRepository.verifyDonationFound(donationTest.id)).resolves.not.toThrowError();
    });
    it('should throw NotFoundError when donation not found in database', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      await expect(sequelizeDonationRepository.verifyDonationFound('fake-id-donation')).rejects.toThrowError(NotFoundError);
    });
  });
  describe('method verifyDonationInFund', () => {
    const donationTest = {
      id: 'donation-199',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest2.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest);
    });
    it('should not throw error when donation found in fund', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      await expect(sequelizeDonationRepository.verifyDonationInFund(donationTest.id, fundTest1.id)).resolves.not.toThrowError();
    });
    it('should throw AuthorizationError when donation not contain in fund', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      await expect(sequelizeDonationRepository.verifyDonationInFund(donationTest.id, fundTest2.id)).rejects.toThrowError(AuthorizationError);
    });
  });
  describe('method getAllDonationsByFundId', () => {
    const donationTest = {
      id: 'donation-199',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest);
    });
    it('shoud return array of object donation corectly', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations, Users);
      const expectedDonations = await sequelizeDonationRepository.getAllDonationsByFundId(fundTest1.id);
      expect(expectedDonations).toHaveLength(1);
      expect(expectedDonations[0].id).toEqual(donationTest.id);
      expect(expectedDonations[0].donateAmount).toEqual(donationTest.donateAmount);
      expect(expectedDonations[0].proofAttachment).toEqual(donationTest.proofAttachment);
      expect(expectedDonations[0].fundId).toEqual(donationTest.fundId);
      expect(expectedDonations[0].user).toBeDefined();
    });
  });
  describe('method getSuccessDonationsByFundId', () => {
    const donationTest1 = {
      id: 'donation-11239',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    const donationTest2 = {
      id: 'donation-340',
      donateAmount: 340000,
      proofAttachment: 'picture.jpg',
      fundId: fundTest1.id,
      userId: userTest2.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest1);
      await DonationTestHelper.addDonation(donationTest2);
    });
    it('should response success donation coretly in fund', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations, Users);
      await DonationTestHelper.setStatusDonationById(donationTest1.id);
      const expectedDonations = await sequelizeDonationRepository.getSuccessDonationsByFundId(fundTest1.id);
      expect(expectedDonations).toHaveLength(1);
      expect(expectedDonations[0].id).toEqual(donationTest1.id);
      expect(expectedDonations[0].donateAmount).toEqual(donationTest1.donateAmount);
      expect(expectedDonations[0].proofAttachment).toEqual(donationTest1.proofAttachment);
      expect(expectedDonations[0].fundId).toEqual(donationTest1.fundId);
      expect(expectedDonations[0].user).toBeDefined();
    });
  });
  describe('method getDonationCountByFundId', () => {
    const donationTest1 = {
      id: 'donation-11239',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    const donationTest2 = {
      id: 'donation-340',
      donateAmount: 340000,
      proofAttachment: 'picture.jpg',
      fundId: fundTest1.id,
      userId: userTest2.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest1);
      await DonationTestHelper.addDonation(donationTest2);
    });
    it('should return donation count amount in fund', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      const expectedDonationCount = await sequelizeDonationRepository.getDonationCountByFundId(fundTest1.id);
      expect(expectedDonationCount).toEqual(donationTest1.donateAmount + donationTest2.donateAmount);
    });
  });
  describe('method getAllDonations', () => {
    const donationTest1 = {
      id: 'donation-11239',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    const donationTest2 = {
      id: 'donation-340',
      donateAmount: 340000,
      proofAttachment: 'picture.jpg',
      fundId: fundTest2.id,
      userId: userTest2.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest1);
      await DonationTestHelper.addDonation(donationTest2);
    });
    it('should return all donation in database', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      const expectedDonations = await sequelizeDonationRepository.getAllDonations();
      expect(expectedDonations).toHaveLength(2);
      expect(expectedDonations[0].id).toEqual(donationTest1.id);
      expect(expectedDonations[0].donateAmount).toEqual(donationTest1.donateAmount);
      expect(expectedDonations[0].proofAttachment).toEqual(donationTest1.proofAttachment);
      expect(expectedDonations[0].fundId).toEqual(donationTest1.fundId);
      expect(expectedDonations[0].userId).toEqual(donationTest1.userId);
      expect(expectedDonations[0].status).toEqual('pending');
      expect(expectedDonations[1].id).toEqual(donationTest2.id);
      expect(expectedDonations[1].donateAmount).toEqual(donationTest2.donateAmount);
      expect(expectedDonations[1].proofAttachment).toEqual(donationTest2.proofAttachment);
      expect(expectedDonations[1].fundId).toEqual(donationTest2.fundId);
      expect(expectedDonations[1].userId).toEqual(donationTest2.userId);
      expect(expectedDonations[1].status).toEqual('pending');
    });
  });
  describe('method getDonationsByUserIdWithFund', () => {
    const donationTest1 = {
      id: 'donation-11239',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    const donationTest2 = {
      id: 'donation-340',
      donateAmount: 340000,
      proofAttachment: 'picture.jpg',
      fundId: fundTest2.id,
      userId: userTest2.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest1);
      await DonationTestHelper.addDonation(donationTest2);
    });
    it('should return donations with fund by user id', async () => {
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations, {}, Funds);
      const expectedDonations = await sequelizeDonationRepository.getDonationsByUserIdWithFund(userTest2.id);
      expect(expectedDonations).toHaveLength(1);
      expect(expectedDonations[0].id).toEqual(donationTest2.id);
      expect(expectedDonations[0].donateAmount).toEqual(donationTest2.donateAmount);
      expect(expectedDonations[0].proofAttachment).toEqual(donationTest2.proofAttachment);
      expect(expectedDonations[0].fundId).toEqual(donationTest2.fundId);
      expect(expectedDonations[0].userId).toEqual(donationTest2.userId);
      expect(expectedDonations[0].status).toEqual('pending');
      expect(expectedDonations[0].fund).toBeDefined();
    });
  });
  describe('method getAprovedDonationAmountCountByFundId', () => {
    const donationTest1 = {
      id: 'donation-832684',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    const donationTest2 = {
      id: 'donation-81231',
      donateAmount: 340000,
      proofAttachment: 'picture.jpg',
      fundId: fundTest1.id,
      userId: userTest2.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest1);
      await DonationTestHelper.addDonation(donationTest2);
    });
    it('should return total amount donation success in fund', async () => {
      await DonationTestHelper.setStatusDonationById(donationTest1.id);
      await DonationTestHelper.setStatusDonationById(donationTest2.id);
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      const expectedTotalAmount = await sequelizeDonationRepository.getAprovedDonationAmountCountByFundId(fundTest1.id);
      expect(expectedTotalAmount).toEqual(donationTest1.donateAmount + donationTest2.donateAmount);
    });
  });
  describe('method getAprovedDonationCountByFundId', () => {
    const donationTest1 = {
      id: 'donation-832684',
      donateAmount: 190000,
      proofAttachment: 'image.jpg',
      fundId: fundTest1.id,
      userId: userTest1.id,
    };
    const donationTest2 = {
      id: 'donation-81231',
      donateAmount: 340000,
      proofAttachment: 'picture.jpg',
      fundId: fundTest1.id,
      userId: userTest2.id,
    };
    beforeEach(async () => {
      await DonationTestHelper.addDonation(donationTest1);
      await DonationTestHelper.addDonation(donationTest2);
    });
    it('should return count of donation success in fund', async () => {
      await DonationTestHelper.setStatusDonationById(donationTest1.id);
      await DonationTestHelper.setStatusDonationById(donationTest2.id);
      const sequelizeDonationRepository = new SequelizeDonationRepository({}, Donations);
      const expectedCountSuccessDonation = await sequelizeDonationRepository.getAprovedDonationCountByFundId(fundTest1.id);
      expect(expectedCountSuccessDonation).toEqual(2);
    });
  });
});
