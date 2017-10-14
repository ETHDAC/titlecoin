

//jshint ignore: start

pragma solidity ^0.4.11;

import './Ownable.sol';
import './Project.sol';
import './TitleToken.sol';

contract DAC is Ownable {
  
  TitleToken public token;
  address[] public projects;
  
  uint256 public goal;
  
  function createToken() {
    token = new TitleToken();
    token.transferOwnership(msg.sender);
  }
  
  function createProject(bytes32 _name) {
    projects.push(new Project(_name));
  }
  
  function getProjects() returns (address[]) { return projects; }
  
  
  
}



//jshint ignore: end