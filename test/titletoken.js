

//jshint ignore: start

const TitleToken = artifacts.require("./TitleToken.sol");

contract('TitleToken', function(accounts) {
  
  let token;
  const owner = accounts[0];
  
  it('TitleToken should be deployed', async function() {
    token = await TitleToken.deployed();
    
    assert(token !== undefined, 'TitleToken is undefined');
  });
  
});
