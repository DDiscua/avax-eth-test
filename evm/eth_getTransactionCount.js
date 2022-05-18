
import axios from 'axios';
import { baseURL } from "../middleware.js";

export async function eth_getTransactionCount(account) {
    return await axios
        .post(baseURL, {
            "jsonrpc": "2.0",
            "method": "eth_getTransactionCount",
            "params": [
                account,
                "latest"
            ],
            "id": 1
        })
        .then(res => {
            console.log("transactions count: ",res.data.result);
            return res;
        })
        .catch(error => {
            console.error(error);
            return error;
        });
}