import { List, Modal, Typography, Image, Card } from "antd";
import { useContext } from "react";
import { DaoContext } from "../../context/DaoContext";

export default function WalletModal({ ...props}){
    const {account,walletModalVisible, getWalletAccount} = useContext(DaoContext);

    const handleSelect = () => {
        
        getWalletAccount('metamask');
    }


    return(
        <Modal
            title="Connect a Wallet"
            visible={!account && walletModalVisible}
            footer
            maskClosable
        >
            <List>
                <List.Item>
                    <Card
                        onClick={handleSelect}
                        hoverable
                        cover={<Image preview={false} src="/images/metamask.png" width={200} />}
                        >
                        
                        <Typography.Paragraph>MetaMask Wallet</Typography.Paragraph>
                    </Card>
                    
                </List.Item>
            </List>
        </Modal>
    )
}