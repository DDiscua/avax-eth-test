

import axios from 'axios';
import { config } from "../middleware.js";

export async function p_getBlockChainStatus(blockchainID) {
    return await axios
        .post(`${config.protocol}://${config.host}:${config.port}/ext/bc/P`, {
            "jsonrpc": "2.0",
            "method": "platform.getBlockchainStatus",
            "params": {
                "blockchainID": blockchainID
            },
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