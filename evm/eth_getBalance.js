
import { baseURL } from '../middleware.js';
import axios from 'axios';

export async function eth_getBalance(account) {
    return await axios
        .post(baseURL, {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [
                account,
                "latest"
            ],
            "id": 1
        })
        .then(res => {
            console.log("balanceFROM: ",account);
            return res;
        })
        .catch(error => {
            console.error(error);
            return error;
        });
}