import { Col, Row, Steps, Button, message } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { createProposal } from "../../../service/wallet";
import ProposalInfoForm from "./ProposalInfoForm";
import VoteOptionsForm from "./VoteOptionsForm";

export default function ProposalSteps() {
    const [formData, setFormData] = useState({});
    const [sendForm, setSendForm] = useState(false);
    const [error, setError] = useState(null);
    const { Step } = Steps;

    const handleFormDataChange =  useCallback((data) => {
        
        setFormData({ ...formData, ...data});
        
    },[formData]);

    const steps = useMemo( () => [
        {
            title: 'Proposal Information',
            content: <ProposalInfoForm {...formData} action={handleFormDataChange}/>
        },
        {
            title: 'Vote Option',
            content: <VoteOptionsForm {...formData} action={handleFormDataChange}/>
        },
    ], [formData, handleFormDataChange]);

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    useEffect(() => {
        (async() => {
            try {
                if(!sendForm){
                    return;
                }

                if(!formData?.title || !formData?.isActive || formData?.voteOptions.length < 1){
                    //execute form.validate()
                    return;
                }

                const hash = await createProposal(formData.title, formData.isActive, formData.voteOptions)
                
                message.success("Proposal Created!!", () => {
                    setFormData({})
                })
                
            } catch (error) {
                console.log(error);
                setError(error.message);
    
            }finally{
                setSendForm(false);
            }
        })()
       
       
    }, [formData,sendForm]);

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
                    <Button type="primary" loading={sendForm} onClick={() => setSendForm(true)}>
                        Done
                    </Button>
                )}

            </Col>
        </Row>

    )
}