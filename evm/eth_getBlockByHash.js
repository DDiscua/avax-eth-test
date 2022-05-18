import { baseURL } from '../middleware.js';
import axios from 'axios';

export async function eth_getBlockByHash(blockHash) {
  return await axios
    .post(baseURL, {

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