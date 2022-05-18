import { eth_sendRawTransaction, eth_signTransaction } from '../evm/index.js';
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
            console.log("Latest Ethereum Block is ", result);
            //console.log("ACCOUNTS: ", web3.eth.accounts.create());
        }).catch(err => {
            console.log(err);
        });
        const tx = {
            from: account,
            to: toAccount,
            gas: 20000,
            gasPrice: 14500000000,
            value: value,
            nonce: 0
        };
        const signPromise = web3.eth.signTransaction(tx, '56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027');
        signPromise.then((signedTx) => {
            console.log("SIGN", signedTx);
        }).catch((err) => {
            console.error("FAILED TO SIGN transaction: ", err);
        })

    });
});