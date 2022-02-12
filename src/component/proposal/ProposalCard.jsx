import { Button, Card, Col, Space,  Typography } from "antd";
import { useEffect, useState } from "react";
import { getProposalAttributes, markProposalClosed } from "../../service/wallet";
import ProposalAuthor from "./ProposalAuthor";



export default function ProposalCard({ author, imageurl, isAuthor, dueDate, proposal, options, showVotingDrawer }) {

    const [totalVotes, setTotalVotes] = useState(0);
    const [closeProposal, setCloseProposal] = useState(null);
    const [isClosed, setIsClosed] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        (async() => {
            const [total, isClosed] = await getProposalAttributes(proposal)
            
            setTotalVotes(total.toString());
            setIsClosed(isClosed)
        })()
    });


    useEffect(() => {
        (async() => {
            try{
                setDeleteLoading(true)
                if(!closeProposal){
                    return;
                }
                await markProposalClosed(closeProposal)
            }catch(error) {
                console.log(error)
                setCloseProposal(prev => prev);
            }finally{
                setDeleteLoading(false);
            }
            
        })()
    }, [closeProposal])
    
    return (
        <Col xs={24} sm={12} md={8} >
            <Card title={<> Author: <ProposalAuthor author={author} imageurl={imageurl}/> </>}
                
                actions={[ <span>Total: {totalVotes}</span>]}
            >
                <Typography.Paragraph>{proposal}</Typography.Paragraph>
                <Space style={{width: '100%', justifyContent: 'center'}}>
                    <Button onClick={ () => showVotingDrawer({author, isAuthor, dueDate, isClosed, proposal, options})}>Details</Button>
                    {isAuthor && !isClosed && <Button loading={deleteLoading} onClick={ () => setCloseProposal(proposal) }>End Voting</Button>}
                </Space>
            </Card>
        </Col>
    )
}


ProposalCard.defaultProps = {
    imageurl: ''
}

