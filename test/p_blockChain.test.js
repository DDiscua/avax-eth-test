import { p_getBlockChains } from '../platformVM/p_getBlockChains.js';
import { p_validatedBy } from '../platformVM/p_validatedBy.js';
import { p_validates } from '../platformVM/p_validates.js';
import { p_getCurrentValidators } from '../platformVM/p_getCurrentValidators.js';
import { getNodeID } from '../platformVM/getNodeID.js';
import { config } from '../middleware.js';
import chai from 'chai';

const { expect } = chai;

describe('p_blockChain: test blockchain healthy', async function () {
    const blockChainExpectedStatus = "Validating";
    let blockChainID = "";
    let subnetID = "";
    let nodeID = "";

    it('gets nodeID', async function () {
        const response = await getNodeID().then(res => { return res });
        nodeID = response.data.result.nodeID;
        expect(response.status).to.equal(200);
        expect(nodeID).not.to.equal("");
    });

    it('verify if blockchain exists', async function () {
        const blockChainName = config.blockChainName;
        const response = await p_getBlockChains().then(res => { return res });
        const blockChains = response.data.result.blockchains;
        const blockChain = blockChains.find(b => b.name === blockChainName);
        blockChainID = blockChain.id;
        subnetID = blockChain.subnetID;
        expect(response.status).to.equal(200);
        expect(blockChain?.name).to.equal(blockChainName);
    });

    it('verify if blockchain is being validated', async function () {
        const response = await p_validatedBy(blockChainID).then(res => { return res });
        const resultSubnetID = response.data.result.subnetID;
        expect(response.status).to.equal(200);
        expect(resultSubnetID).to.equal(subnetID);
    });

    it('verify if subnetID is validating the blockchain', async function () {
        const response = await p_validates(subnetID).then(res => { return res });
        const blockChainsIDs = response.data.result.blockchainIDs;
        expect(response.status).to.equal(200);
        expect(blockChainsIDs.includes(blockChainID)).to.equal(true);
    });

    it('verify if node is validating current blockchain', async function () {
        const response = await p_getCurrentValidators(subnetID).then(res => { return res });
        const validators = response.data.result.validators;
        const nodeValitaor = validators.find(V => V.nodeID === nodeID);
        expect(response.status).to.equal(200);
        expect(nodeValitaor.nodeID).to.equal(nodeID);
    });
});