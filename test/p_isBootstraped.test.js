import { isBootstrapped } from '../platformVM/isBootstrapped.js';
import chai from 'chai';

const { expect } = chai;

describe('isBootstrapped', async function () {
    it('respond with valid HTTP status code and verify is C chain is bootstraped', async function () {
        const response = await isBootstrapped("C").then(res => { return res });
        expect(response.status).to.equal(200);
        expect(response.data.result.isBootstrapped).to.equal(true);
    });
    it('respond with valid HTTP status code and verify is X chain is bootstraped', async function () {
        const response = await isBootstrapped("X").then(res => { return res });
        expect(response.status).to.equal(200);
        expect(response.data.result.isBootstrapped).to.equal(true);
    });
    it('respond with valid HTTP status code and verify is P chain is bootstraped', async function () {
        const response = await isBootstrapped("P").then(res => { return res });
        expect(response.status).to.equal(200);
        expect(response.data.result.isBootstrapped).to.equal(true);
    });
});