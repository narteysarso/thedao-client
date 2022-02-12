import { Drawer, Space, Typography, Button, Spin, message, } from "antd";
import { useCallback, useContext, useEffect, useMemo, useReducer,} from "react";
import { DaoContext } from "../../context/DaoContext";
import { castVote,  getProposals, getProposalVoteCast} from "../../service/wallet";
import ProposalAuthor from "./ProposalAuthor";
import ProposalStats from "./ProposalStats";


const VoteOptions = ({ options = [], setVoteOption, ...props }) => {

    return (
        <Space style={{ width: '100%', justifyContent: 'space-evenly' }}>
            {
                options?.map((option, idx) =>
                (
                    <Button key={idx} onClick={() => setVoteOption(option)} >
                        {option}
                    </Button>
                )
                )
            }

        </Space>
    )
}

const initialState = {
    hasVoted: false,
    loading: false,
    error: null,
    voteOption: null,
    voteStatistics: {},
    castedVotes: []

}


const reducerfxn = (state = {}, { type, payload }) => {

    switch (type) {
        case 'setHasVoted':
            return { ...state, hasVoted: payload };

        case 'setLoading':
            return { ...state, loading: payload };

        case 'setError':
            return { ...state, error: payload };

        case 'setVoteOption':
            return { ...state, voteOption: payload };

        case 'setVoteStats':
            return { ...state, voteStats: payload }
        
        case 'setCastedVotes': 
            return {...state, castedVotes: payload}

        default:
            return state;
    }
}


export default function ProposalDrawer({ setVisible, visible, proposal, ...props }) {
    const [state, dispatch] = useReducer(reducerfxn, initialState)
    const {setCreatedProposals, account} = useContext(DaoContext);

    const setLoading = (value) => {
        dispatch({ type: 'setLoading', payload: value });
    }

    const setVoteOption = (value)=>{
        dispatch({ type: 'setVoteOption', payload: value })
    }

    const setError = (error) => {
        dispatch({ type: 'setError', payload: error})
    }

    const setCastedVotes = (castedvotes = []) => {
        dispatch({type: 'setCastedVotes', payload: castedvotes});
    }

    const setVoteStats = (stats = {}) => {
        dispatch({type: 'setVoteStats', payload: stats})
    }

    const setHasVoted = (value = false) => {
        dispatch({type: 'setHasVoted', payload : value})
    }

    const getProps = useCallback (() => {
        return {
            proposal: proposal?.proposal,
            options: proposal?.options || [],
            castedVotes: state.castedVotes,
            voteOption: state.voteOption,
            voteStats: state.voteStats,
            setLoading,
            setVoteOption,
        }
    }, [proposal, state]);

    useEffect(() => {

        (async ({voteOption, proposal}) => {
            try {
                
                setLoading(true);

                state.error && message.error(state.error);

                if (!state.voteOption) {
                    return;
                }

                await castVote(proposal, voteOption);

                const createdProposals = await getProposals();

                const castedvotes = await getProposalVoteCast(proposal);

                setCastedVotes(castedvotes);

                setCreatedProposals([...createdProposals]);

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
                setVoteOption(null)
            }

        })({voteOption: state.voteOption, proposal: proposal?.proposal})



    }, [state.voteOption]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!proposal) {
                    return;
                }

                const castedvotes = await getProposalVoteCast(proposal?.proposal);

                setCastedVotes(castedvotes);

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        })();

    }, [proposal])

    useEffect(() => {

        let hasVoted = false;

        const voteStats = state.castedVotes?.reduce((accumulator, vote) => {
            if (!accumulator[vote.voteOption]) {
                accumulator[vote.voteOption] = 0;
            }

            if(vote._sender.toLowerCase() === account){
                console.log(vote._sender)
                hasVoted = true;
            }

            accumulator[vote.voteOption] += 1

            return accumulator;
        }, {})

        setVoteStats({ ...voteStats, total: state.castedVotes.length });
        setHasVoted(hasVoted);

    }, [state.castedVotes])

    const voteOptions = useMemo (() => {
        
        if(proposal?.isClosed){
            return <Typography.Paragraph style={{textAlign: 'center'}}>Voting has been closed</Typography.Paragraph>
        }

        if(state.hasVoted){
            return <Typography.Paragraph style={{textAlign: 'center'}}>You have already voted</Typography.Paragraph>
        }


        return <VoteOptions
            {...getProps()}
        />
    }, [proposal,state.hasVoted, getProps]);
    
    return (
        <Drawer
            closable
            onClose={() => { setVisible(false) }}
            visible={visible}>

            <Spin spinning={state.loading}>
                <Typography.Title level={4}>Proposal: {proposal?.proposal} </Typography.Title>
                <Typography.Paragraph><ProposalAuthor {...proposal} /></Typography.Paragraph>
                <Typography.Paragraph><b>Options: </b> Select the options below to cast your vote</Typography.Paragraph>
                
                {voteOptions}

                <ProposalStats {...getProps()} />
            </Spin>

        </Drawer>
    )
}