import { Layout, Menu, Tag, Typography } from "antd";
import { useContext } from "react"
import { Link } from "react-router-dom";
import { DaoContext } from "../context/DaoContext"

export default function Navbar() {
    const { account, setWalletModalVisible, setRegistrationModalVisible, isRegistered} = useContext(DaoContext);

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
                
                <Menu theme="dark" mode="horizontal" style={{flex: 2, marginLeft: '11vw'}}>
                    <Menu.Item key={1}>
                        <Link  to={"/"} >Home</Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Link   to={"/proposals"} >Proposals</Link>
                    </Menu.Item>
                </Menu>
                <Menu selectable={false} theme="dark" mode="horizontal" style={{flex: 1}} onClick={ handleSubMenuClick }>
                    {!isRegistered ? <Menu.Item key={1}>
                        Register
                    </Menu.Item> : 
                    <Menu.Item key={2}>
                        Account: &nbsp;
                        <Tag style={{width: 100}}>
                            <Typography.Text ellipsis>{account}</Typography.Text> 
                        </Tag>
                        </Menu.Item>}
                    {!account && <Menu.Item key={3}>
                        Connect Wallet
                    </Menu.Item>}
                </Menu>
            </div>
           
        </Layout.Header>
    )
}