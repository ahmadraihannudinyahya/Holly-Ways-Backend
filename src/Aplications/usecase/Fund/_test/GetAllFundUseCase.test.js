/* istanbul ignore file */
const GetAllFundUseCase = require('../GetAllFundUseCase');
const FundRepository = require('../../../../Domains/Fund/FundRepository');
const DonationRepository = require('../../../../Domains/Donations/DonationRepository');

const GetFund = require('../../../../Domains/Fund/Entities/GetFund');

describe('GetAllFundUseCase test', () => {
  it('should orchestrating GetAllFundUseCase corectly', async () => {
    const expectedFunds = [
      {
        id: 'fund-123',
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
      },
      {
        id: 'fund-122',
        title: 'test ',
        thumbnail: 'image.jpg',
        goal: 2000000,
        description: 'just for test',
        createdAt: new Date(),
        status: 'open',
        donations: [
        ],
      },
    ];
    const expectedResult = expectedFunds.map((fund) => new GetFund({
      id: fund.id,
      title: fund.title,
      thumbnail: fund.thumbnail,
      goal: fund.goal,
      description: fund.description,
      createdAt: fund.createdAt,
      status: fund.status,
      donationObtained: fund.donations.reduce((total, donation) => {
        if (donation.status === 'success') {
          return total + donation.donateAmount;
        }
        return total;
      }, 0),
      donationCount: fund.donations.reduce((total, donation) => {
        if (donation.status === 'success') {
          return total + 1;
        }
        return total;
      }, 0),
    }));
    const mockFundRepository = new FundRepository();
    const mockDonationRepository = new DonationRepository();

    mockFundRepository.getAllFundsWithDonations = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedFunds));

    const getAllFundUseCase = new GetAllFundUseCase({
      fundRepository: mockFundRepository,
      donationRepository: mockDonationRepository,
    });

    const result = await getAllFundUseCase.execute();

    expect(result).toEqual(expectedResult);
    expect(mockFundRepository.getAllFundsWithDonations).toBeCalled();
  });
});
