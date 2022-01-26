import { Layout, Menu } from "antd";
import { useContext } from "react"
import { DaoContext } from "../context/DaoContext"

export default function Navbar() {
    const { account } = useContext(DaoContext);
    return (
        <Layout.Header>
            <div className="d-flex" style={{justifyContent: 'space-between'}}>
                
                <Menu theme="dark" mode="horizontal" style={{flex: 2}}>
                    <Menu.Item>
                        Home
                    </Menu.Item>
                    <Menu.Item>
                        Proposals
                    </Menu.Item>
                </Menu>
                <Menu theme="dark" mode="horizontal" style={{flex: 1}}>
                    <Menu.Item >
                        Register
                    </Menu.Item>
                    <Menu.Item>
                        Connect Wallet
                    </Menu.Item>
                </Menu>
            </div>
           
        </Layout.Header>
    )
}