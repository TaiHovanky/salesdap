import React from 'react';
import axios from 'axios';
import ForgotPassword from '../../pages/forgot-password';
import { connect } from 'react-redux';
import { hideError, showError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface Props {
  setIsLoading: any;
  showError: any;
  hideError: any;
}

const ForgotPasswordContainer = ({ setIsLoading, showError, hideError }: Props) => {
  const onSubmit = (values: any) => {
    const formData = new FormData();
    formData.append('email', values.email);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    setIsLoading(true);
    axios.post('http://localhost:3001/api/v1/forgotpassword', formData, config)
      .then(() => {
        setIsLoading(false);
        hideError();
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsLoading(false);
        showError('Wrong email or password');
      });
  };

  return (
    <ForgotPassword onSubmit={onSubmit} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer);