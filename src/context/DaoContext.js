import { createContext, useEffect, useState } from "react";
import { checkWalletConnection, getAccount } from "../service/wallet";

export const DaoContext = createContext();


const walletStrategy = {
    'metamask': getAccount
}


export function DaoProvider({children}){
    const [isConnected, setIsConntected] = useState( checkWalletConnection() );
    const [walletModalVisible, setWalletModalVisible] = useState(false);
    const [proposalModalVisible, setProposalModalVisible] = useState(false);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);


    const getWalletAccount = async (stratergy) => {
        try{

            if(!walletStrategy[stratergy]){
                throw Error("Unknown wallet chosen");
            }

            const account = await walletStrategy[stratergy]();
            
            setAccount(account);
            setIsConntected(true);
        }catch(error){
            console.error(error);
            setError(error.message);
        }   
    }



    useEffect(() => {

        if(!account){
            console.log(isConnected, account);
            setWalletModalVisible(true);
        }
    },[isConnected, account]);

    return(
        <DaoContext.Provider value={{
            walletModalVisible,
            setWalletModalVisible,
            proposalModalVisible,
            setProposalModalVisible,
            error,
            account,
            isConnected,
            getWalletAccount
        }}>
            {children}
        </DaoContext.Provider>
    )
}