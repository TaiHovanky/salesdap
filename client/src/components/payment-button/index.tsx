import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Fab } from '@mui/material';
import { Payment as PaymentIcon } from '@mui/icons-material';

export const PREMIUM_PRICE: number = 15;

const PaymentButton = () => {
  const publishableKey: string = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'testkey';

  const handlePayment = async (token: any) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/payment', {
        amount: PREMIUM_PRICE,
        token
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log('response payment', response);
      if (response.status === 200) {
        console.log('successful responses')
      }
    } catch(err) {
      console.log('err with payment', err)
    }
  }

  return (
    <>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay with Credit Card"
        billingAddress
        shippingAddress
        amount={PREMIUM_PRICE}
        description={`Your total is $${PREMIUM_PRICE}`}
        token={handlePayment}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="pay"
        >
          <PaymentIcon sx={{ mr: 1 }} />
          Pay Now
        </Fab>
      </StripeCheckout>
    </>
  )
}

export default PaymentButton;