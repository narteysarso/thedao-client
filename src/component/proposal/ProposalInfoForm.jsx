import { Checkbox, Col, DatePicker, Form, Input, Row } from "antd";

export default function ProposalInfoForm(){

    const handleSubmit = (values) => {

    }

    return(
        <Row justify="center">
            <Col xs={24} md={16}>
                <Form 
                    layout="horizontal"
                    onFinish={handleSubmit}
                    >
                    <Form.Item
                        label="Proposal Title"
                        rules={[
                            {
                                require: true,
                                message: "Proposal title cannot be empty"
                            }
                        ]}
                    >
                        <Input name="title"  />
                    </Form.Item>
                    <Form.Item
                        label="Due Date:"
                        >
                        <DatePicker style={{width:'100%'}} />
                    </Form.Item>
                    <Form.Item
                    >
                        <Checkbox name="isActive" checked={true} /> IsActive
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}