import { useState } from "react";
import Accordion from "../UI/Accordion/Accordion";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import SnackBar from "../UI/SnackBar";
import GroupedRadio from "../UI/Inputs/Group/GroupedRadio";

interface Option {
  value: string;
  label: string;
}

const radioOptions: Option[] = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Center', value: 'top-center' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Center', value: 'bottom-center' },
  { label: 'Bottom Right', value: 'bottom-right' },
];

const DesignSystemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] = useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('bottom-left');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirm = () => {
    alert('Confirmed!');
    closeModal();
  };
  const handleAnchorOriginChange = (selected: Option|null) => {
    const allowedValues = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ] as const;
    if (selected && allowedValues.includes(selected.value as typeof allowedValues[number])) {
      setAnchorOrigin(selected.value as typeof allowedValues[number]);
    }
  }

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
      <div style={{ display: 'flex', gap: '1rem' }}>
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
          size="medium" // Try 'small', 'medium', 'large', 'fullScreen'
          backdropClosable
        >
          <p>Are you sure you want to continue with this action?</p>
        </Modal>
      </div>
      <h2>SnackBar</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <GroupedRadio
          id="anchorOrigin"
          orientation="row"
          options={radioOptions}
          defaultSelected={'bottom-left'}
          onChange={handleAnchorOriginChange}
        />
        <Button variant="outlined" color="default" onClick={() => setSnackOpen(true)}>Show Snackbar</Button>
        <SnackBar
          open={snackOpen}
          onClose={() => setSnackOpen(false)}
          //message="Form saved successfully!"
          variant="error"
          anchorOrigin={anchorOrigin}
          autoHideDuration={3000}
        >
          <strong>Error:</strong> Something went wrong!
        </SnackBar>
      </div>
    </div>
  )
};

export default DesignSystemPage;