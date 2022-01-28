import { ethers } from "ethers";
import DAO from "../contract/DAO.json";

const abi = DAO.abi;

export function checkWalletConnection(){
    if(!window.ethereum){
        throw Error("MetaMask is required");
    }

    return true;
}

export function connectToBlockchain(){
    checkWalletConnection();

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const connection = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, signer);

    return connection;
}

export async function getAccount(){
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

    if(!accounts[0]){
        throw Error("Create a MetaMask Account")
    }
    return accounts[0];
}

export async function register( account, value){
    const contract = connectToBlockchain();

    const txn = await contract.register({from: account, value: value });

    await txn.wait();

    return txn.hash;
}

export async function isRegistered(account){
    const contract = connectToBlockchain();

    const result = await contract.isRegistered(account);

    return result;
}

export async function vote(proposal, voteOption){
    const contract = connectToBlockchain();

    const result = await contract.vote(proposal, voteOption);

    return result;
}
