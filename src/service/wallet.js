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
