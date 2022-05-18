import { eth_getBlockByHash } from '../evm/eth_getBlockByHash.js';
import chai from 'chai';

const { expect } = chai;

describe('eth_getBlockByHash', async function () {
  it('respond with valid HTTP status code and block Hash', async function () {
    const blockHash = '0x82d0b9cf0aa8a9032d19f4e33e5c2b01f436f477ecb058c54a1b3489434206a9';
    const response = await eth_getBlockByHash(blockHash).then(res => { return res });
    expect(response.status).to.equal(200);
    expect(response.data.result.hash).to.equal(blockHash);
  });
});