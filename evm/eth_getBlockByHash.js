import { apiClient }  from '../middleware.js';


export const eth_getBlockByHash = async(blockHash) => {
return await apiClient
    .post({
      
          "jsonrpc": "2.0",
          "method": "eth_getBlockByHash",
          "params": [
              blockHash,
              true
          ],
          "id": 1
    })
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch(error => {
      console.error(error);
    });
}
