import React from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setModalWindow } from '../../store/lkSlice';

import Delete from './Delete';
import ContactInfo from './ContactInfo';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalWindow = () => {
  const dispatch = useAppDispatch();
  const { modalWindow } = useAppSelector((state) => state.lkSlice);
  const handleClose = () =>
    dispatch(
      setModalWindow({
        open: false,
        type: '',
        id: '',
      })
    );

  return (
    <Modal
      open={modalWindow.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalWindow.type === 'delete' ? (
          <Delete />
        ) : modalWindow.type === 'create' ? (
          <ContactInfo type="create" />
        ) : modalWindow.type === 'edit' ? (
          <ContactInfo type="edit" />
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
};

export default ModalWindow;
