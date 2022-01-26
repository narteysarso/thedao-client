import { Modal } from "antd";
import { useContext } from "react";
import { DaoContext } from "../../context/DaoContext";
import ProposalSteps from "../proposal/Steps";

export default function ProposalModal({visible, handleSubmit, ...props}){

    const {proposalModalVisible, setProposalModalVisible} = useContext(DaoContext);

    const handleCancel = () => {
        setProposalModalVisible(false);
    }

    return (
        <Modal 
            title="Submit a Proposal"
            visible={proposalModalVisible}
            width={"calc(100% - 30vw)"}
            onCancel={handleCancel}
            footer>

                <ProposalSteps />

        </Modal>
    )
}