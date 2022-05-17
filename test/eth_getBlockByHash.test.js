import chai from 'chai';
import { eth_getBlockByHash } from '../evm/index.js';

const { assert } = chai;

describe('eth_getBlockByHash', function () {
    it('respond with valid HTTP status code and description and message', function (done) {
      const blockHash = '0x82d0b9cf0aa8a9032d19f4e33e5c2b01f436f477ecb058c54a1b3489434206a9';
      const result = eth_getBlockByHash.addTested(blockHash);
      assert.equal(result.status, 200);
      
     /* const response = await supertest(eth_getBlockByHash(blockHash)).post('/shots').send({
        title: 'How to write a shot',
        body: "Access the Edpresso tutorial"
      });*/

      // Compare response with expectations
     /* expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Shot Saved Successfully.');*/
    });
});