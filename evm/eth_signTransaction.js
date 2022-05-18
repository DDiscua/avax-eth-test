
import axios from 'axios';
import { baseURL, config } from "../middleware.js";

export async function eth_signTransaction(fromAccount, toAccount, value) {
    return await axios
        .post(baseURL, {
            "from": fromAccount,
            "to": toAccount,
            "gas": config.gas,
            "gasPrice": config.gasPrice,
            "nonce": "0x0",
            "value": value
        })
        .then(res => {
            console.log("signTransaction result: ", res.data.result);
            return res;
        })
        .catch(error => {
            console.error(error);
            return error;
        });
}