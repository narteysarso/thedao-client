import { ethers, utils } from "ethers";
import DAO from "../contract/DAO.json";

const abi = DAO.abi;
const CONTRACT_ADDRESS = "0x35270F28EBE8BEFF0B4772D21a2AdAE84d2d43a7";

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

export async function register(value) {
    try {
        const contract = connectToBlockchain();

        const amountInWei = utils.parseEther(value);

        const txn = await contract.registerMember({ value: amountInWei });

        await txn.wait();

        return txn.hash;
    } catch (error) {
        console.log(error)
    }

}


export async function getMembers() {
    console.log('dda')
    const contract = connectToBlockchain();

    const result = await contract.getMembers();

    console.log(result);
    return result;
}

export async function vote(proposal, voteOption) {
    const contract = connectToBlockchain();

    const result = await contract.vote(proposal, voteOption);

    return result;
}
