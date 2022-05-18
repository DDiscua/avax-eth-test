import { getNetworkName } from '../platformVM/getNetworkName.js';
import { config } from '../middleware.js';
import chai from 'chai';

const { expect } = chai;

describe('getNetworkName', async function () {
    it('respond with valid HTTP status code and verify network name is correct', async function () {
        const response = await getNetworkName().then(res => { return res });
        expect(response.status).to.equal(200);
        expect(response.data.result.networkName).to.equal(config.networkName);
    });
});