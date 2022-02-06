import { Col, DatePicker, Form, Input, Row, Switch } from "antd";

export default function ProposalInfoForm({title ="" , isActive = true, action}){

    const handleValuesChange = (changedValues, allvalues) => {
        action(allvalues);
    }

    return(
        <Row justify="center">
            <Col xs={24} md={16}>
                <Form 
                    layout="horizontal"
                    onValuesChange={handleValuesChange}
                    >
                    <Form.Item
                        name="title"
                        label="Proposal Title"
                        rules={[
                            {
                                require: true,
                                message: "Proposal title cannot be empty"
                            }
                        ]}
                        initialValue={title}
                    >
                        <Input   />
                    </Form.Item>
                    <Form.Item
                        label="Due Date:"
                        >
                        <DatePicker style={{width:'100%'}} />
                    </Form.Item>
                    <Form.Item
                        name="isActive"
                        label="isActive"
                        initialValue={isActive}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}