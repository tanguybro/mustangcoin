import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const config: HardhatUserConfig = {
    solidity: '0.8.17',
    networks: {
        mumbai: {
            url: process.env.MUMBAI_URL!,
            accounts: [process.env.PRIVATE_KEY!],
        },
    },
    etherscan: {
        apiKey: {
            mumbai: process.env.MUMBAI_PRIVATE_KEY!,
        },
    },
    paths: {
        artifacts: './artifacts',
    },
};

export default config;
