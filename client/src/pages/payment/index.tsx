import React from 'react';
import axios from 'axios';
import { Fab } from '@mui/material';
import { Payment as PaymentIcon } from '@mui/icons-material';

const Payment = () => {
  return (
    <Fab variant="extended" color="primary" type="submit">
      <PaymentIcon sx={{ mr: 1 }} />
      Checkout
    </Fab>
  );
}

export default Payment;