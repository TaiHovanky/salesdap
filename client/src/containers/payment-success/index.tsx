import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SuccessDisplay from '../../pages/payment-success';
import { hideError, showError } from '../../state/actions/alert';
import { RegistrationState } from '../../state/reducers/registration';

interface Props {
  registrationUser: RegistrationState;
  showError: any;
  hideError: any;
}

const SuccessDisplayContainer = ({ registrationUser, showError, hideError }: Props) => {
   // Check to see if this is a redirect back from Checkout
   const query = new URLSearchParams(window.location.search);
 
   const sessionId = query.get('session_id');
 
   useEffect(() => {
     console.log('use effect success', sessionId, registrationUser);
     axios.post('http://localhost:3001/api/v1/order-success', { sessionId, ...registrationUser })
       .then((res) => {
         console.log('res data from order success', res.data);
         hideError();
       })
       .catch(() => {
         showError();
       });
   }, [])
 
  const handleManageSubscriptionClick = () => {
    axios.post('http://localhost:3001/api/v1/create-portal-session', { sessionId });
  }

  return (
    <SuccessDisplay
    handleManageSubscriptionClick={handleManageSubscriptionClick}
    />
  );
}

const mapStateToProps = (state: any) => ({
  registrationUser: state.registration,
});

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessDisplayContainer);