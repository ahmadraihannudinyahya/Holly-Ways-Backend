const GetMyFundUseCase = require('../GetMyFundUseCase');

const TokenManager = require('../../../Security/TokenManager');
const FundRepository = require('../../../../Domains/Fund/FundRepository');

const GetFund = require('../../../../Domains/Fund/Entities/GetFund');

describe('GetMyFundUseCase test', () => {
  it('should orchestrating GetMyFundUseCase corectly', async () => {
    const payload = {
      token : 'fakeToken.JustForTest', 
    };
    const expectedUserId = 'user-123';
    const expectedFunds = [
      {
        id : 'fund-123', 
        title : 'test title',
        thumbnail : 'iamge.jpg', 
        goal : 20000000, 
        description : 'not have description just for test', 
        createdAt : new Date(), 
        status : 'open',
        donations : [
          {
            status : 'success',
            donateAmount : 25000,
          }, 
          {
            status : 'pending',
            donateAmount : 50000
          },
          {
            status : 'success',
            donateAmount : 50000, 
          },
        ],
      },
      {
        id : 'fund-122', 
        title : 'test ',
        thumbnail : 'image.jpg', 
        goal : 2000000, 
        description : 'just for test', 
        createdAt : new Date(), 
        status : 'open',
        donations : [
        ],
      }
    ];
    const expectedResult = expectedFunds.map(fund => {
      return new GetFund({
        id : fund.id, 
        title : fund.title,
        thumbnail : fund.thumbnail, 
        goal : fund.goal, 
        description : fund.description, 
        createdAt : fund.createdAt, 
        status : fund.status, 
        donationObtained : fund.donations.reduce((total, donation) => {
          if(donation.status === 'success'){
            return total + donation.donateAmount;
          }
          return total;
        }, 0),
        donationCount : fund.donations.reduce((total, donation)=>{
          if(donation.status === 'success'){
            return total + 1;
          };
          return total;
        }, 0),
      })
    });

    const mockTokenManager = new TokenManager();
    const mockFundRepository = new FundRepository();

    mockTokenManager.verifyToken = jest.fn()
      .mockImplementation(() => Promise.resolve({userId : expectedUserId}));
    mockFundRepository.getFundsByOwnerWithDonations = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedFunds));

    const getMyFundUseCase = new GetMyFundUseCase({
      tokenManager : mockTokenManager, 
      fundRepository : mockFundRepository, 
    });

    const result = await getMyFundUseCase.execute(payload);

    expect(result).toEqual(expectedResult);
    expect(mockTokenManager.verifyToken).toBeCalledWith(payload.token);
    expect(mockFundRepository.getFundsByOwnerWithDonations).toBeCalledWith(expectedUserId);
  });
});