import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Fab } from '@mui/material';
import { Payment as PaymentIcon } from '@mui/icons-material';

export const PREMIUM_PRICE: number = 15 * 100; // amount is in cents

const PaymentButton = ({
  user,
  handleSubmit,
  disabled,
  setIsLoading
}: any) => {
  const publishableKey: string = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'testkey';

  const handlePayment = async (token: any) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/v1/payment', {
        amount: PREMIUM_PRICE,
        token
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200) {
        handleSubmit(user);
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
          disabled={disabled}
        >
          <PaymentIcon sx={{ mr: 1 }} />
          sign up & pay now
        </Fab>
      </StripeCheckout>
    </>
  )
}

export default PaymentButton;