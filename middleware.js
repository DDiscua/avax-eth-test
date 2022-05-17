import axios from 'axios';
import { devConfig , qaConfig } from "./config.js"; 

const config = process.env.NODE_EV === 'QA' ? qaConfig : devConfig;

export const apiClient = axios.create({
    baseURL: `${config.protocol}://${config.host}:${config.port}${config.rpcExt}/${config.blockChainID}/${config.rpc}`,
    timeout: 120000,
    headers: {
      'Accept': 'application/json',    
  }});
