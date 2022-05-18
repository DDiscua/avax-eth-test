import { eth_getTransactionCount } from '../evm/eth_getTransactionCount.js';
import { config } from '../middleware.js';
import chai from 'chai';

const { expect } = chai;

describe('eth_getTransactionCount', async function () {
    it('respond with valid HTTP status code and seed account transaction count should be greather than 0', async function () {
        const account = config.seedAccount;
        const response = await eth_getTransactionCount(account).then(res => { return res });
        const resultCount = parseInt(response.data.result, 16);
        expect(response.status).to.equal(200);
        expect(resultCount).to.greaterThan(0);
    });
});