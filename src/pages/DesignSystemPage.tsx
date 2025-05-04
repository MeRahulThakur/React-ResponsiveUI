import { useState } from "react";
import Accordion from "../UI/Accordion/Accordion";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const DesignSystemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    alert('Confirmed!');
    closeModal();
  };

  return (
    <div className="page">
      <h1>Design System</h1>
      <h2>Accordion</h2>
      <Accordion />
      <h2>Buttons</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="contained" color="danger" onClick={() => { }}>Delete</Button>
        <Button variant="outlined" color="success" onClick={() => { }}>Success</Button>
        <Button variant="text" color="default" onClick={() => { }}>Cancel</Button>
        <Button variant="contained" color="default" onClick={() => { }} loading>Loading</Button>
      </div>
      <h2>Modal</h2>
      <div>
        <Button variant="contained" color="default" onClick={openModal}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Confirmation"
          showCloseIcon
          showActions
          onConfirm={handleConfirm}
          confirmText="Yes, continue"
          cancelText="Cancel"
          fullScreen={false}
          backdropClosable
        >
          <p>Are you sure you want to continue with this action?</p>
        </Modal>
      </div>
    </div>
  )
};

export default DesignSystemPage;