

//jshint ignore: start

pragma solidity ^0.4.11;

import './SafeMath.sol';

contract TitleToken {
  
  using SafeMath for uint256;
  
  
  mapping(address => uint256) balances;
  uint256 public totalSupply;
  
   
  event Transfer(address indexed from, address indexed to, uint256 value);


  function balanceOf(address _owner) public constant returns (uint256 balance) {
    return balances[_owner];
  }
  
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    // SafeMath.sub will throw if there is not enough balance.
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[_from]);

    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(_from, _to, _value);
    return true;
  }
  
}



//jshint ignore: end