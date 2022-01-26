import { Row, Col, Typography, Image, Avatar } from "antd";
import Banner from "../Banner";
import Wave1 from "../../svg/wave1.svg";
import SupportStrip from "../SupportStrip";
import FloatTag from "../FloatTag";

export function Welcome() {
    return (
        <Row>
            <Col xs={24}>
                <Banner style={{position: 'absolute', width: '100%', height: '100%', padding: "5vw 7vw", overflow: 'hidden'}}/>
            </Col>
            <Col xs={24}>
                <SupportStrip />
            </Col>
            <Col xs={24}>
                <Row justify="center" align="center" style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="" style={{ position: 'absolute', width: '100%', height: '100%', padding: "5vw 7vw", overflow: 'hidden' }}>
                        <img width={"100%"} src={Wave1} style={{ opacity: .8, position: 'absolute', bottom: '0%', left: '0%' }} />
                    </div>
                    <Col xs={24} sm={12} style={{ padding: "5vw 7vw", marginBottom: "8rem" }}>
                        <Typography.Title>What is a DAO?</Typography.Title>
                        <Typography.Paragraph className="f-lora f-3">
                            DAOs are an effective and safe way to work with like-minded folks around the globe.
                        </Typography.Paragraph>

                        <Typography.Paragraph className="f-lora f-3">
                            Think of them like an internet-native business that's collectively owned and managed by its members. They have built-in treasuries that no one has the authority to access without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice.
                        </Typography.Paragraph>

                        <Typography.Paragraph className="f-lora f-3">
                            There's no CEO who can authorize spending based on their own whims and no chance of a dodgy CFO manipulating the books. Everything is out in the open and the rules around spending are baked into the DAO via its code.
                        </Typography.Paragraph>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Image src="/images/contentcreators.png" />
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row className="bg-gradient p-2" justify="center" align="center">
                    <Col style={{ height: "50vh", }}>
                        <Typography.Title level={3} >Merits of DAO</Typography.Title>
                        <div className="d-flex j-center a-center mt-2" >

                            <FloatTag className="float-tag float-tag-deg0" style={{ width: 310, backgroundColor: '#fdfdfd', top: "35%" }}>
                                <Avatar /> Usually flat, and fully democratized.
                            </FloatTag>
                            <FloatTag className="float-tag float-tag-deg60" style={{ width: 300, backgroundColor: '#fdfdfd', top: "35%" }}>
                                <Avatar /> Voting required by members for any changes to be implemented.
                            </FloatTag>
                            <FloatTag className="float-tag float-tag-deg120" style={{ width: 300, backgroundColor: '#fdfdfd', top: "35%" }}>
                                <Avatar /> Votes tallied, and outcome implemented automatically without trusted intermediary.
                            </FloatTag>
                            <FloatTag className="float-tag float-tag-deg180" style={{ width: 300, backgroundColor: '#fdfdfd', top: "35%" }}>
                                <Avatar /> Services offered are handled automatically in a decentralized manner
                            </FloatTag>
                            <FloatTag className="float-tag" style={{ width: 300, backgroundColor: '#fdfdfd', top: "35%" }}>
                                <Avatar /> All activity is transparent and fully public
                            </FloatTag>

                        </div>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}