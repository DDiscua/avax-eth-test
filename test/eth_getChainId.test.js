import { eth_getChainId } from '../evm/eth_getChainId.js';
import { devConfig, qaConfig } from "../config.js";
import chai from 'chai';

const { expect } = chai;
const config = process.env.NODE_ENV === 'QA' ? qaConfig : devConfig;
describe('eth_getChainId', async function () {
    it('respond with valid HTTP status code and chainID from blockChain', async function () {
        const chainID = config.chainID;
        const response = await eth_getChainId().then(res => { return res });
        expect(response.status).to.equal(200);
        expect(response.data.result).to.equal(chainID);
    });
});