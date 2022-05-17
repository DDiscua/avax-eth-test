import { Avalanche, BinTools, Buffer, BN } from "avalanche"
import {devConfig, qaConfig} from "./config";

const bintools = BinTools.getInstance()

const config = process.env.NODE_EV === 'QA' ? qaConfig : devConfig;

const networkID = config.networkID; 
const avalanche = new Avalanche(config.host, config.port, config.protocol, networkID)
const xchain = avalanche.XChain();