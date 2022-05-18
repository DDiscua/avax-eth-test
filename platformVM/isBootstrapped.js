

import axios from 'axios';
import { config } from "../middleware.js";

export async function isBootstrapped(chain) {
    return await axios
        .post(`${config.protocol}://${config.host}:${config.port}/ext/info`, {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "info.isBootstrapped",
            "params": {
                "chain": chain
            }
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            console.error(error);
            return error;
        });
}