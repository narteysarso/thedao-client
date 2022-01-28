import { AlertTwoTone } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { useContext } from "react";
import { DaoContext } from "../../../context/DaoContext";


export default function RegisterForm(){
    const {account} = useContext(DaoContext);

    const handleSubmit = (values) => {
        
        
    }

    

    return(
        <Row justify="center">
            <Col xs={24} md={16}>
        <Form
            initialValues={{
                account,
                fee: process.env.REACT_APP_REGISTRATION_FEE
            }}
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Account"
                name="account"
                rules={[
                    {
                        required: true,
                        message: "Please provide a valid account",
                    }
                ]}
            >
                <Input  disabled />
            </Form.Item>
            <Form.Item
                name="fee"
                label="Registration Fee"
                rules={[
                    {
                        required: true,
                        message: "Incorrect fees"
                    }

                ]}
                
                >
                <InputNumber disabled min={1}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" >Register</Button>
            </Form.Item>
        </Form>
        </Col>
        </Row>
    )
}