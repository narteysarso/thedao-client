import { ethers, utils } from "ethers";
import DAO from "../contract/DAO.json";

const abi = DAO.abi;
const CONTRACT_ADDRESS = "0xAFB8e94138Bb5415198f32789d2C6A6c9Ee4367e";

export function checkWalletConnection() {
    if (!window.ethereum) {
        throw Error("MetaMask is required");
    }

    return true;
}

export function connectToBlockchain() {
    checkWalletConnection();

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const connection = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    return connection;
}

export async function getAccount() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    if (!accounts[0]) {
        throw Error("Create a MetaMask Account")
    }
    return accounts[0];
}

export async function register(username, imageUrl, value) {

        if(!username){
            throw Error('username is required')
        }

        const contract = connectToBlockchain();

        const amountInWei = utils.parseEther(value);

        const txn = await contract.registerMember(username, imageUrl, { value: amountInWei });

        await txn.wait();

        return txn.hash;

}

export async function getMembers() {
    const contract = connectToBlockchain();

    const result = await contract.getMembers();
    
    return result;
}

export async function checkRegistration(account){
    const contract = connectToBlockchain();
    const result = await contract.checkRegistered(account);

    return result;
}

export async function createProposal(title, options, endDate = null){
    const contract = connectToBlockchain();

    const txn = await contract.createProposal(title, options, endDate);

    const receipts = await txn.wait();

    return receipts;

}

export async function getProposalAttributes(title){
    const contract = connectToBlockchain();

    const attribs = await contract.getProposalAttributes(title);


    return attribs;

}

export async function castVote(proposal, voteOption) {
    const contract = connectToBlockchain();

    const txn = await contract.vote(proposal, voteOption);

    const result = await txn.wait();

    return result;
}

export async function getProposals(){
    const contract = connectToBlockchain();
    const eventsLog = await contract.queryFilter(contract.filters.ProposalCreated());
    const proposals = eventsLog.map( event => ({...event.args}));
    return proposals.reverse();
}

async function getVoteCast(sender = null, voteOption = null, proposal = null){

    const contract = connectToBlockchain();

    const topics = contract.filters.VoteCasted(sender, voteOption, proposal);

    const eventsLog = await contract.queryFilter(topics)

    const castedvotes = eventsLog.map(event => ({...event.args}));

    return castedvotes.reverse();
}

export async function getProposalVoteCast(proposal){
    return getVoteCast(null, null, proposal);
}

export async function markProposalClosed(proposal){

    const contract = connectToBlockchain();

    const txn = await contract.markProposalClosed(proposal);

    const result = await txn.wait();

    return result;
}