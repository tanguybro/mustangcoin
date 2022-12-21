// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MustangCoin is ERC20, Ownable {
    mapping(address => bool) minters;
    uint256 public constant SUPPLY = 1000000 * 10 ** 18; // 1M

    constructor() ERC20('MustangCoin', 'MTC') {}

    function mint(uint _amount) external {
        require(minters[msg.sender] == true, "You don't have the right to mint");
        require(totalSupply() + _amount <= SUPPLY, 'All the tokens are already mint');
        _mint(msg.sender, _amount);
    }

    function addMinter(address _minter) external onlyOwner {
        minters[_minter] = true;
    }

    function removeMinter(address _minter) external onlyOwner {
        minters[_minter] = false;
    }
}
