import axios from 'axios';
import { config } from "../middleware.js";

export async function getNetworkName() {
    return await axios
        .post(`${config.protocol}://${config.host}:${config.port}/ext/info`, {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "info.getNetworkName",
            "params": {
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