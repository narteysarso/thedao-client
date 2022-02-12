
import { Col, Row, Input, Divider, Button, message} from "antd";

import { useContext, useEffect, useMemo, useState } from "react";
import { DaoContext } from "../../context/DaoContext";
import { getProposals } from "../../service/wallet";
import ProposalDrawer from "../proposal/ProposalDrawer";
import ProposalList from "../proposal/ProposalList";

const { Search } = Input;

export default function Proposal() {
    const { account, setProposalModalVisible, proposalModalVisible, setCreatedProposals, createdProposals } = useContext(DaoContext)
    const [voteProposal, setVoteProposal] = useState(null);
    const [loading, setLoading] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const proposals = await getProposals();
                const keywoard = search.toLocaleLowerCase();
                const filteredProposals = search ? proposals.filter(proposal => proposal?.proposal?.toLowerCase()?.includes(keywoard) || proposal?.author?.toLowerCase()?.includes(keywoard) ) : proposals;
                setCreatedProposals(filteredProposals);
                
            } catch (error) {
               
                setError(error.message);
            } finally {
                setLoading(false)
            }
        })();
    }, [search]);

    useEffect(() => {
        console.log('get error')
        error && message.error(error);
    }, [error]);


    const showVotingDrawer = (proposalDetails) => {
        setDrawerVisible(true);
        setVoteProposal(proposalDetails)
    }

    const ProposalListing = useMemo(() => {
        return <ProposalList currentAddress={account} loading={loading} createdProposals={createdProposals} showVotingDrawer={showVotingDrawer} />
    }, [loading, account, createdProposals])

    return (
        <Row justify="center" style={{ padding: "5rem 2vw" }}>
            <Col xs={24} md={16} style={{ minHeight: '80vh', overflow: 'hidden', padding:'1rem' }} >

                <Row justify="center">
                    <Col xs={24}>
                        <Row gutter={[24]} justify="center" align="center">
                            <Col xs={24} sm={17} md={18}>
                                <Search size="large" onSearch={(keyword) => setSearch(keyword)}/>

                            </Col>
                            <Col>
                                <Button size="large" block type="primary" onClick={() => setProposalModalVisible(true)} disabled={proposalModalVisible}>Create a Proposal</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Divider />

                    <Col xs={24} style={{ paddingTop: '2rem' }}>
                        <Row gutter={[24, 24]} justify="start">
                            {ProposalListing}
                        </Row>
                    </Col>

                </Row>
                <ProposalDrawer visible={drawerVisible} setVisible={setDrawerVisible} proposal={voteProposal} />

            </Col>
        </Row>
    )
}