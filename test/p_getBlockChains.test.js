import { p_getBlockChains } from '../platformVM/p_getBlockChains.js';
import { config } from '../middleware.js';
import chai from 'chai';

const { expect } = chai;

describe('p_getBlockChains', async function () {
    it('respond with valid HTTP status code and verify if blockchain exists', async function () {
        const blockChainName = config.blockChainName;
        const response = await p_getBlockChains().then(res => { return res });
        const blockChains = response.data.result.blockchains;
        const blockChain = blockChains.find(b => b.name === blockChainName);
        expect(response.status).to.equal(200);
        expect(blockChain?.name).to.equal(blockChainName);
    });
});