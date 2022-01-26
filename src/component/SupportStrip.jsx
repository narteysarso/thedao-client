import { Row, Col } from "antd";
export default function SupportStrip(){
    return (
        <Row> 
            <Col xs={24} className="center-text f-lora p-1">
                <span className="tag-heading"><b>Support:</b> </span>
                <span className="tag-item">Cadena Dev</span>
                <span className="tag-item">React JS</span>
                <span className="tag-item">Ant Design</span>
                <span className="tag-item">Alchemy</span>
                <span className="tag-item">Hardhat</span>
                <span className="tag-item">Google</span>
                <span className="tag-item">Ethereum.org</span>
            </Col>
        </Row>
    )
}