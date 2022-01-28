import { Modal } from "antd";
import { useContext } from "react";
import { DaoContext } from "../../context/DaoContext";
import RegisterForm from "../forms/registration/RegisterForm";


export default function RegistrationModal() {
    const { registrationModalVisible, setRegistrationModalVisible } = useContext(DaoContext);
    return (
        <Modal
            title="Provide Registration Details"
            visible={registrationModalVisible}
            footer
            onCancel={() => setRegistrationModalVisible(false)}
        >
            <RegisterForm />
        </Modal>
    )
}