const GetFundByIdUseCase = require('../GetFundByIdUseCase');

const FundRepository = require('../../../../Domains/Fund/FundRepository');
const DonationRepository = require('../../../../Domains/Donations/DonationRepository');
const GetFund = require('../../../../Domains/Fund/Entities/GetFund');

describe('GetFundByIdUseCase test', () => {
  it('should orchestrating GetFundByIdUseCase corectly', async () => {
    const fundId = 'fund-123';
    const expectedFund = {
      id: fundId,
      title: 'test title',
      thumbnail: 'iamge.jpg',
      goal: 20000000,
      description: 'not have description just for test',
      createdAt: new Date(),
      status: 'open',
      donations: [
        {
          status: 'success',
          donateAmount: 25000,
        },
        {
          status: 'pending',
          donateAmount: 50000,
        },
        {
          status: 'success',
          donateAmount: 50000,
        },
      ],
    };
    const expectResult = new GetFund({
      id: expectedFund.id,
      title: expectedFund.title,
      thumbnail: expectedFund.thumbnail,
      goal: expectedFund.goal,
      description: expectedFund.description,
      createdAt: expectedFund.createdAt,
      status: expectedFund.status,
      donationObtained: expectedFund.donations.reduce((total, donation) => {
        if (donation.status === 'success') {
          return total + donation.donateAmount;
        }
        return total;
      }, 0),
      donationCount: expectedFund.donations.reduce((total, donation) => {
        if (donation.status === 'success') {
          return total + 1;
        }
        return total;
      }, 0),
    });

    const mockFundRepository = new FundRepository();
    const mockDonationRepository = new DonationRepository();

    mockFundRepository.verifyFundFound = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockFundRepository.getFundsByIdWithDonations = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedFund));

    const getFundByIdUseCase = new GetFundByIdUseCase({
      fundRepository: mockFundRepository,
      donationRepository: mockDonationRepository,
    });

    const result = await getFundByIdUseCase.execute(fundId);

    expect(result).toEqual(expectResult);
    expect(mockFundRepository.verifyFundFound).toBeCalledWith(fundId);
    expect(mockFundRepository.getFundsByIdWithDonations).toBeCalledWith(fundId);
  });
});
