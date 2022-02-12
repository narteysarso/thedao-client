import { createContext, useEffect, useState, useCallback } from "react";
import { checkRegistration, checkWalletConnection, getAccount, getMembers } from "../service/wallet";

export const DaoContext = createContext();


const walletStrategy = {
    'metamask': getAccount
}


export function DaoProvider({children}){
    const [isConnected, setIsConntected] = useState( checkWalletConnection() );
    const [walletModalVisible, setWalletModalVisible] = useState(false);
    const [proposalModalVisible, setProposalModalVisible] = useState(false);
    const [registrationModalVisible, setRegistrationModalVisible] = useState(false);
    const [createdProposals, setCreatedProposals] = useState([]);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);
    const [isRegistered, setIsRegistered] = useState( false);

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

    const getAllMembers = useCallback( () => async () => {
        
        const result = await getMembers();
        if(result[account]){
            setIsRegistered(true);
        }
    }, [account]);

    useEffect(() => {

        (async() => {
            if(!account){
                setWalletModalVisible(true);
                return;
            }

            setIsRegistered(await checkRegistration(account));
        } )()

        

    },[isConnected, account, getAllMembers]);

    return(
        <DaoContext.Provider value={{
            walletModalVisible,
            setWalletModalVisible,
            proposalModalVisible,
            setProposalModalVisible,
            error,
            account,
            isConnected,
            getWalletAccount,
            registrationModalVisible, 
            setRegistrationModalVisible,
            isRegistered,
            setIsRegistered,
            createdProposals,
            setCreatedProposals
        }}>
            {children}
        </DaoContext.Provider>
    )
}