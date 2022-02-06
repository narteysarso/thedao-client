
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { DaoContext } from "../../../context/DaoContext";
import { register } from "../../../service/wallet";


export default function RegisterForm() {
    const { account, setIsRegistered, setRegistrationModalVisible } = useContext(DaoContext);
    const [registerInfo, setRegisterInfo] = useState(null);
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = ({ username, imageUrl = "", fee }) => {

        setRegisterInfo({username, imageUrl,  value: fee.toString() })
    }

    

    useEffect(() => {

        (async () => {

            try {
                setLoading(true);
                if (!registerInfo) {
                    throw Error("Registration details required")
                }

                const txnHash = await register(registerInfo.username, registerInfo.imageUrl, registerInfo.value);

                if (!txnHash) {
                    return;
                }

                setIsRegistered(true);
                setRegistrationModalVisible(false);

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }

        })();

    }, [registerInfo, setIsRegistered]);


    return (
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
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please provide a valid account",
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
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
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="fee"
                        label="Registration Fee (ether)"
                        rules={[
                            {
                                required: true,
                                message: "Incorrect fees"
                            }

                        ]}

                    >
                        <InputNumber disabled />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" >Register</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}