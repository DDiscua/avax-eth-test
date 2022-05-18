import { eth_sendRawTransaction, eth_signTransaction } from '../evm/index.js';
import { sendAvax } from "../utils.js";
import { config, baseURL } from '../middleware.js';
import chai from 'chai';
import Web3 from 'web3';
const { expect } = chai;

const provider = baseURL;
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);

describe.skip('eth_sendRawTransaction', async function () {
    const toAccount = '0x04df307140b6dAb0951b3caBF2F174355952a1D0';
    const account = config.account.address;
    const mockAccount = {
        address: '0x12BFD6f00C879dFAC5968Df6212E150B66E8924b',
        privateKey: '0xf806da03424d8375c5d1e149e76d6993ae0590f8f89a7534fe7eea3b5c10d69a',
    };

    it('send a transaction from seedAccount to another account', async function () {
        const value = 100;
        const hexValue = value.toString(16)
        const signTransaction = eth_signTransaction(account, toAccount, hexValue).then(res => { return res });;
        web3.eth.getBlockNumber().then((result) => {
            //   console.log("Latest Ethereum Block is ", result);
            //console.log("ACCOUNTS: ", web3.eth.accounts.create());
        }).catch(err => {
            console.log(err);
        });
        // setting max fee as 100 and priority fee as 2
        const result = await sendAvax("0.001", config.seedAccount, 1, 1);
        expect((result).txHash).to.not.equal(null);
        expect(result.nonce).to.not.equal(null);

    });
});