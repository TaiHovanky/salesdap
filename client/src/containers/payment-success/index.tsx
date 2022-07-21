import React, { useEffect } from 'react';
import axios from 'axios';
import SuccessDisplay from '../../pages/payment-success';
import { connect } from 'react-redux';
import { hideError, showError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface Props {
  showError: any;
  hideError: any;
  setIsLoading: any;
}

const SuccessDisplayContainer = ({
  showError,
  hideError,
  setIsLoading
}: Props) => {
   // Check to see if this is a redirect back from Checkout
   const query = new URLSearchParams(window.location.search);
 
   const sessionId = query.get('session_id');
 
   useEffect(() => {
    setIsLoading(true);
     axios.post('http://localhost:3001/api/v1/order-success', { sessionId })
       .then(() => {
         setIsLoading(false);
         hideError();
       })
       .catch(() => {
         setIsLoading(false);
         showError('Problem with user registration');
       });
   }, [])
 
  const handleManageSubscriptionClick = () => {
    setIsLoading(true);
    axios.post('http://localhost:3001/api/v1/create-portal-session', { sessionId })
      .then((res: any) => {
        setIsLoading(false);
        hideError();
        if (!!res && !!res.data) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('err subscription', err);
        showError('There was a problem with connecting with the subscription portal.');
        setTimeout(() => {
          hideError();
        }, 10000);
      });;
  }

  return (
    <SuccessDisplay
    handleManageSubscriptionClick={handleManageSubscriptionClick}
    />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(null, mapDispatchToProps)(SuccessDisplayContainer);