import React from 'react';
import axios from 'axios';
import { Fab } from '@mui/material';
import { Payment as PaymentIcon } from '@mui/icons-material';

const Payment = ({ createRegistrationUser, registrationUser }: any) => {
  const handleCreateCheckoutSession = () => {
    createRegistrationUser(registrationUser);
    return axios.post('http://localhost:3001/api/v1/create-checkout-session', {
      customerEmail: registrationUser.email
    })
      .then((res) => {
        console.log('res', res);
        if (!!res && !!res.data) {
          window.location.href = res.data.url;
        }
      });
  }

  return (
    <Fab variant="extended" color="primary" onClick={handleCreateCheckoutSession}>
      <PaymentIcon sx={{ mr: 1 }} />
      Checkout
    </Fab>
  );
}

export default Payment;