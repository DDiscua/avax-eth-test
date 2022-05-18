import axios from 'axios';
import { devConfig, qaConfig } from "./config.js";
import dotenv from 'dotenv'
dotenv.config();

export const config = process.env.NODE_ENV === 'QA' ? qaConfig : devConfig;
export const baseURL = `${config.protocol}://${config.host}:${config.port}${config.rpcExt}/${config.blockChainID}/${config.rpc}`;
export const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 120000,
  headers: {
    'Accept': 'application/json',
  }
});
