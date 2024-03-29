
import { baseURL } from '../middleware.js';
import axios from 'axios';

export async function eth_getChainId() {
    return await axios
        .post(baseURL, {
            "jsonrpc": "2.0",
            "method": "eth_chainId",
            "params": [],
            "id": 1
        })
        .then(res => {
            console.log("chainID: ", res.data.result);
            return res;
        })
        .catch(error => {
            console.error(error);
            return error;
        });
}