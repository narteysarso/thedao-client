import { Layout, Menu } from "antd";
import { useContext } from "react"
import { Link } from "react-router-dom";
import { DaoContext } from "../context/DaoContext"

export default function Navbar() {
    const { account, setWalletModalVisible, setRegistrationModalVisible } = useContext(DaoContext);

    

    const handleSubMenuClick = ({ key,...rest}) => {
        if(key === "1"){
            setRegistrationModalVisible(true);
            return;
        }
        if(key === "2"){
            setWalletModalVisible(true);
            return;
        }
    }

    return (
        <Layout.Header>
            <div className="d-flex" style={{justifyContent: 'space-between'}}>
                
                <Menu theme="dark" mode="horizontal" style={{flex: 2}}>
                    <Menu.Item key={1}>
                        <Link  to={"/"} >Home</Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Link   to={"/proposals"} >Proposals</Link>
                    </Menu.Item>
                </Menu>
                <Menu selectable={false} theme="dark" mode="horizontal" style={{flex: 1}} onClick={ handleSubMenuClick }>
                    <Menu.Item key={1}>
                        Register
                    </Menu.Item>
                    {!account && <Menu.Item key={2}>
                        Connect Wallet
                    </Menu.Item>}
                </Menu>
            </div>
           
        </Layout.Header>
    )
}