
import axios from 'axios';
import { baseURL } from "../middleware.js";

export async function eth_sendRawTransaction(signedTransaction) {
    return await axios
        .post(baseURL, {
            "jsonrpc": "2.0",
            "method": "eth_sendRawTransaction",
            "params": [signedTransaction],
            "id": 1
        })
        .then(res => {
            console.log("transactions result: ", res.data.result);
            return res;
        })
        .catch(error => {
            console.error(error);
            return error;
        });
}