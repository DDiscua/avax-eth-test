import { apiClient } from '../middleware.js';
import axios from 'axios';

export async function eth_getBlockByHash(blockHash) {
  console.log(apiClient.getUri());
  return await axios
    .post('http://35.231.246.12:9650/ext/bc/ZhcK92AeusTViX14rfxaPFqTxU1x7noBe9zyPqAzovdAL6uZT/rpc', {

      "jsonrpc": "2.0",
      "method": "eth_getBlockByHash",
      "params": [
        blockHash,
        true
      ],
      "id": 1
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
}