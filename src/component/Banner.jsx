
import { Row, Col, Typography, Button, Avatar } from "antd";
import { useContext } from "react";
import { DaoContext } from "../context/DaoContext";
import qoutes from "../quotes.json";
import BackgroundPattern from "./BackgroundPattern";

export default function Banner() {
    const {account, setRegistrationModalVisible} = useContext(DaoContext)
    return (
        <Row justify="center" align="center" style={{ backgroundColor: "whitesmoke" }}>
           <BackgroundPattern />
            <Col xs={24} md={{ span: 10, offset: 2 }} style={{ padding: "5vw 7vw", marginBottom: "8rem" }}>
                <Typography.Title level={1} className='banner-heading'>
                    Our world, <br /> Our way
                </Typography.Title>
                <Typography.Paragraph className="quote">
                    "
                    {qoutes.qoutes[parseInt(Math.random() * qoutes.qoutes.length)]}
                    "
                </Typography.Paragraph> 
                <Typography.Paragraph>
                    Join our DAO with 0.0001 ether to submit proposals and vote on proposals by others. <br/>
                </Typography.Paragraph>
                <Typography.Title level={5}>The power is yours!!!</Typography.Title>
                {!account && <Button aria-label="join button" type="primary" shape="round" size="large" onClick={() => setRegistrationModalVisible(true)}>
                    Join us
                </Button>}
            </Col>
            <Col xs={24} md={12} style={{ paddingTop: "4vw", paddingLeft: "1vw", minHeight: "400px" }}>
                <div className="circle-wrapper">
                    <Avatar className="circle-item deg0" size={64} src="/images/people/person1.jpg" />
                    <Avatar className="circle-item deg30" size={100} src="/images/people/person2.jpg" />
                    <Avatar className="circle-item deg60" size={80} src="/images/people/person3.jpg" />
                    <Avatar className="circle-item deg120" size={80} src="/images/people/person4.jpg" />
                    <Avatar className="circle-item deg180" size={64} src="/images/people/person5.jpg" />
                    <Avatar className="circle-item deg270" size={100} src="/images/people/person7.jpg" />
                    <Avatar className="circle-item" size={200} src="/images/people/person6.jpg" />
                </div>
            </Col>
        </Row>
    )
}