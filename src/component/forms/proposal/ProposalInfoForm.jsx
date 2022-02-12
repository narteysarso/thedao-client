import { Col, DatePicker, Form, Input, Row} from "antd";

export default function ProposalInfoForm({title ="" , action}){

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
                        name="endDate"
                        >
                        <DatePicker style={{width:'100%'}} />
                    </Form.Item>
                    
                </Form>
            </Col>
        </Row>
    )
}