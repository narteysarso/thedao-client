import { ethers, utils } from "ethers";
import DAO from "../contract/DAO.json";

const abi = DAO.abi;
const CONTRACT_ADDRESS = "0x63b9fD8765bd565ad44BA6BaF644eE59951fB526";

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

export async function createProposal(title, isActive, options){
    const contract = connectToBlockchain();

    const txn = await contract.createProposal(title, isActive, options);

    const receipts = await txn.wait();

    console.log(receipts);

    return txn.hash;

}

export async function vote(proposal, voteOption) {
    const contract = connectToBlockchain();

    const result = await contract.vote(proposal, voteOption);

    return result;
}


export async function getProposals(){
    const contract = connectToBlockchain();
    const eventsLog = await contract.queryFilter(contract.filters.ProposalCreated());
    const proposals = eventsLog.map( event => ({author: event.args.author, _author: event.args._author, proposal: event.args.proposal, options : event.args.options}));

    return proposals;
}