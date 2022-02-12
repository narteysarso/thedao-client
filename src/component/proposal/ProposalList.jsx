import { Empty } from "antd";
import ProposalCard from "./ProposalCard";
import { LoadingOutlined } from "@ant-design/icons";

export default function ProposalList({ currentAddress, loading, showVotingDrawer,createdProposals, ...props }) {

    const proposallist = createdProposals?.map(({ author, _author, dueDate, proposal, options }, idx) => {
        const isAuthor = _author?.toLowerCase() === currentAddress;
       
        return (
            <ProposalCard key={idx} author={author} isAuthor={isAuthor} proposal={proposal} options={options} showVotingDrawer={showVotingDrawer} />
        )
    }
    )

    return (
        <> {
            !createdProposals ?
                <Empty {... (!loading) ? { description: "No proposals found" } : { description: 'Loading', image: <LoadingOutlined /> }} />
                : proposallist
        }
        </>
    )
}