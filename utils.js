import ethers from 'ethers';
import Avalanche from 'avalanche';
import { baseURL, config } from "./middleware.js";
import { eth_getBalance } from "./evm/eth_getBalance.js";
const AvalancheGO = Avalanche.Avalanche;
import dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATEKEY;

// For sending a signed transaction to the network
const nodeURL = baseURL;
const HTTPSProvider = new ethers.providers.JsonRpcProvider(nodeURL);

// For estimating max fee and priority fee using CChain APIs
const chainId = 900504;
const avalanche = new Avalanche.Avalanche("35.231.246.12", 9650, 'http', "ZhcK92AeusTViX14rfxaPFqTxU1x7noBe9zyPqAzovdAL6uZT", undefined, "900504", undefined, false);
const cchain = avalanche.CChain();

// For signing an unsigned transaction
const wallet = new ethers.Wallet(privateKey);
const address = wallet.address;
//console.log("ADDRESS: ", address);

// Function to estimate max fee and max priority fee
const calcFeeData = async (maxFeePerGas = undefined, maxPriorityFeePerGas = undefined) => {

    const baseFee = parseInt(await cchain.getBaseFee(), 16) / 1e9;
    maxPriorityFeePerGas = maxPriorityFeePerGas == undefined ? parseInt(await cchain.getMaxPriorityFeePerGas(), 16) / 1e9 : maxPriorityFeePerGas;
    maxFeePerGas = maxFeePerGas == undefined ? baseFee + maxPriorityFeePerGas : maxFeePerGas;

    if (maxFeePerGas < maxPriorityFeePerGas) {
        throw ("Error: Max fee per gas cannot be less than max priority fee per gas");
    }

    return {
        maxFeePerGas: maxFeePerGas.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas.toString()
    };
}

// Function to send AVAX
export const sendAvax = async (amount, to, maxFeePerGas = undefined, maxPriorityFeePerGas = undefined, nonce = undefined) => {
    try {
        const getBalance = await eth_getBalance(address);
        const accountBalance = getBalance.data.result;
        console.log("balanceXXX2", accountBalance, parseInt(accountBalance, 16));
        if (nonce == undefined) {
            nonce = await HTTPSProvider.getTransactionCount(address);
            console.log("nonce: ", nonce);
        }

        // If the max fee or max priority fee is not provided, then it will automatically calculate using CChain APIs
        ({ maxFeePerGas, maxPriorityFeePerGas } = await calcFeeData(maxFeePerGas, maxPriorityFeePerGas));

        maxFeePerGas = ethers.utils.parseUnits(maxFeePerGas, "gwei");
        maxPriorityFeePerGas = ethers.utils.parseUnits(maxPriorityFeePerGas, "gwei");

        // Type 2 transaction is for EIP1559
        const tx = {
            type: 2,
            nonce,
            to,
            maxPriorityFeePerGas,
            maxFeePerGas,
            value: ethers.utils.parseEther(amount),
            chainId,
        };

        tx.gasLimit = await HTTPSProvider.estimateGas(tx);

        const signedTx = await wallet.signTransaction(tx);
        const txHash = ethers.utils.keccak256(signedTx);

        // console.log('Sending signed transaction');

        // Sending a signed transaction and waiting for its inclusion
        await (await HTTPSProvider.sendTransaction(signedTx)).wait();

        //console.log(`View transaction with nonce ${nonce}${txHash}`);
        return {
            nonce,
            txHash
        }
    } catch (err) {
        console.log(err);
        return {
            nonce: null,
            txHash: null
        }
    }
};