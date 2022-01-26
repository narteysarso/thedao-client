import { Col, Row, Steps, Button, message } from "antd";
import { useState } from "react";
import ProposalInfoForm from "./ProposalInfoForm";
import VoteOptionsForm from "./VoteOptionsForm";

export default function ProposalSteps() {

    const { Step } = Steps;
    const steps = [
        {
            title: 'Proposal Information',
            content: <ProposalInfoForm />
        },
        {
            title: 'Vote Option',
            content: <VoteOptionsForm />
        },
    ];

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <Row>
            <Col span={24}>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
            </Col>
            <Col span={24}>
                <div className="steps-content">{steps[current].content}</div>
            </Col>
            <Col span={24} className="steps-action">
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Proceed
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}

            </Col>
        </Row>

    )
}