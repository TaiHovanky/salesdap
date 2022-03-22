import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import Stepper from '../../components/stepper';
import NavBar from '../../components/nav-bar';
import EmailCapture from '../email-capture';

const Home = () => {
  const [isEmailCaptureModalOpen, setIsEmailCaptureModalOpen] = useState(true);

  const handleClose = (event: any) => {
    // event.preventDefault();
    setIsEmailCaptureModalOpen(false);
  }

  return (
    <>
      <NavBar />
      <Stepper />
      <Dialog open={isEmailCaptureModalOpen} onClose={handleClose}>
        <EmailCapture onClose={handleClose} />
      </Dialog>
    </>
  );
}

export default Home;