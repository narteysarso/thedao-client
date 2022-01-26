import { Col, Layout, Row, Typography } from "antd";
import BackgroundPattern from "../BackgroundPattern";
import Navbar from "../Navbar";

export function MainLayout({children, ...props}){
    return(
        <Layout className="site-layout">
            
                <Navbar />
            
            <Layout.Content>
                {children}
            </Layout.Content>
            <Layout.Footer className="center-text">
                <Row>
                    <Col span={24}>

                        <BackgroundPattern style={{position: 'absolute',width: '100%', height: '100%', overflow: 'hidden'}}/>
                        <Typography.Title level={5}>
                            Daoist &copy; {(new Date()).getFullYear()} |
                            Hire me: <a href="https://linkedin/in/narteykodjosarso" rel="noreferrer">Nartey Kodjo-Sarso</a>
                        </Typography.Title>
                    </Col>
                </Row>
            </Layout.Footer>
        </Layout>
    )
}