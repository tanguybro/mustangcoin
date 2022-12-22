import { expect } from 'chai';
import { utils } from 'ethers';
import { ethers } from 'hardhat';

describe('Test MustangCoin', async () => {
    let contract;
    let deployer;
    let otherAccount;

    before(async () => {
        [deployer, otherAccount] = await ethers.getSigners();
        const Contract = await ethers.getContractFactory('MustangCoin');
        contract = await Contract.deploy();
    });

    it('Only minters can mint', async () => {
        await expect(contract.connect(otherAccount).mint(1)).to.be.reverted;
    });

    it('Minter can mint', async () => {
        await contract.connect(deployer).addMinter(deployer.address);
        const balanceBeforeMint = await contract.balanceOf(deployer.address);
        expect(balanceBeforeMint).to.equal(0);

        await contract.connect(deployer).mint(utils.parseEther('1.0'));

        const balanceAfterMint = await contract.balanceOf(deployer.address);
        expect(balanceAfterMint).to.equal(utils.parseEther('1.0'));
    });

    it("Can't mint more than supply", async () => {
        await expect(contract.connect(deployer).mint(utils.parseEther('1000000.0'))).to.be.reverted;
    });
});
