import { expect } from 'chai';
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

    it('Should have 1000000 tokens of total supply', async () => {
        const supply = await contract.SUPPLY();
        expect(supply).to.equal(1000000 * 10 ** 18);
    });

    it('Only minters can mint', async () => {
        await expect(contract.connect(otherAccount).mint(1)).to.be.reverted;
    });

    it('Minter can mint', async () => {
        await contract.connect(deployer).addMinter(deployer);
        const balanceBeforeMint = await contract.balanceOf(deployer.address);
        expect(balanceBeforeMint).to.equal(0);

        await contract.connect(deployer).mint(1);

        const balanceAfterMint = await contract.balanceOf(deployer.address);
        expect(balanceAfterMint).to.equal(1);
    });

    it("Can't mint more than supply", async () => {
        await contract.connect(deployer).addMinter(deployer);
        await expect(contract.connect(deployer).mint(1000001)).to.be.reverted;
    });
});
