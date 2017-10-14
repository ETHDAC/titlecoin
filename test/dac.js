

//jshint ignore: start

const DAC = artifacts.require("./DAC.sol");
const TitleToken = artifacts.require("./TitleToken.sol");

/**************************************
* Helpers
**************************************/
const promisify = (inner) => new Promise((resolve, reject) =>
  inner((err, res) => {
    if (err) { reject(err) }
    resolve(res);
  })
);
const getBalance = (account, at) => promisify(cb => web3.eth.getBalance(account, at, cb));
const timeout = ms => new Promise(res => setTimeout(res, ms))

/**************************************
* Contract
**************************************/
contract('DAC', function(accounts) {
  
  let dac, token;
  const owner = accounts[0];
  const rand1 = accounts[1];
  const rand2 = accounts[2];
  const rand3 = accounts[3];
  const mill = 1000000;
  
  it('DAC should be deployed', async function() {
    dac = await DAC.deployed();
    assert(dac !== undefined, 'DAC is undefined');
  });
  
  it('should create token', async function() {
    const tx = await dac.createToken();
    const address = await dac.token.call();
    token = await TitleToken.at(address);
    assert(token !== undefined, 'no token');
  });
  
  it('should create project', async function() {
    const tx = await dac.createProject('test');
    const projects = await dac.getProjects.call();
    
    assert(projects.length === 1, 'wrong amount of projects');
  });
  
  it('Owner should mint some and transfer to rand1', async function() {
    const tx = await token.mint(mill, rand1, { from: owner });
    
    console.log(tx.logs[0].args);
    
    const totalSupply = (await token.totalSupply.call()).toNumber();
    assert(totalSupply === mill, 'totalSupply wrong');
    
    const balance = (await token.balanceOf.call(0)).toNumber();
    assert(balance === mill, 'balance wrong');
  });
  
  it('Portion of title sent to project', async function() {
    const projects = await dac.getProjects.call();
    const tx = await token.transfer(projects[0], 0, mill / 2, { from: rand1 });
    
    console.log(tx.logs[0].args);
  });
  
});

//jshint ignore: end
