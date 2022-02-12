import { List, Progress, Space, Divider, Typography } from "antd";
import { useMemo } from "react";
import ProposalAuthor from "./ProposalAuthor";


const VoteStats = ({ voteStatistics, options, ...props }) => {
    return (
        <Space style={{ width: '100%', justifyContent: 'space-evenly', paddingTop: "10px" }}>
            {
                options?.filter(key => key !== 'total').map((key, idx) =>
                {
                    const percentage = (voteStatistics?.total === 0) ? voteStatistics.total : ((voteStatistics[key] || 0) / voteStatistics?.total * 100).toFixed(2);
                    return (
                    <Space key={idx} direction="vertical" style={{ justifyContent: 'center', alignItems:'center' }}>
                        <Typography.Text>{key}</Typography.Text>
                        <Progress  type="circle" percent={percentage} width={60} />
                    </Space> )
                }
                )
            }

        </Space>
    )
}

const VoteListing = ({ castedVotes, ...props }) => {


    return (
        <List
            dataSource={castedVotes}
            renderItem={
                item => (
                    <List.Item
                        actions={[item.voteOption]}
                    >
                        <List.Item.Meta
                            avatar={<ProposalAuthor author={item.author} imageurl={item.imageUrl} />}
                        />
                    </List.Item>
                )
            }
        />
    )
}

export default function ProposalStats({ castedVotes, voteStats, options }) {
    const voteStateMemo = useMemo(() => <VoteStats voteStatistics={voteStats} options={options} />, [voteStats, options])
    return (
        <>
            {voteStateMemo}
            <Divider />

            <Typography.Paragraph>Casting History</Typography.Paragraph>
            <VoteListing
                castedVotes={castedVotes}
            />
        </>
    )
}