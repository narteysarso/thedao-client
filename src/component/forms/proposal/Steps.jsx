import { Col, Row, Steps, Button, message } from "antd";
import { useCallback, useContext, useMemo, useState, useEffect } from "react";
import { DaoContext } from "../../../context/DaoContext";
import { createProposal } from "../../../service/wallet";
import ProposalInfoForm from "./ProposalInfoForm";
import VoteOptionsForm from "./VoteOptionsForm";

export default function ProposalSteps() {
    const {setCreatedProposals, createdProposals} = useContext(DaoContext)
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

                if(!formData?.title || formData?.voteOptions.length < 1){
                    //execute form.validate()
                    return;
                }

                const txn= await createProposal(formData.title, formData.voteOptions, Date.parse(formData.endDate) )
                
                message.success("Proposal Created!!", () => {
                    setFormData({})
                    setCreatedProposals([{ author : txn.events[0].args[3], _author  :txn.events[0].args[0],  proposal: txn.events[0].args[2], options : txn.events[0].args[4], timestamp: txn.events[0].args[5]}, ...createdProposals])
                });
                
            } catch (error) {
                setError(error.message);
    
            }finally{
                setSendForm(false);
            }
        })()
       
       
    }, [formData,sendForm]);


    useEffect(() => {
        error && message.error(error);
    }, [error]);

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