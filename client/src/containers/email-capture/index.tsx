import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setIsLoading } from '../../state/actions/loading';
import { showError, hideError } from '../../state/actions/alert';
import EmailCapture from '../../pages/email-capture';

interface Props {
  onClose: any;
  showError: any;
  hideError: any;
  setIsLoading: any;
}

const EmailCaptureContainer = ({ onClose, showError, hideError, setIsLoading }: Props) => {
  const onSubmit = (values: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    axios.post('http://localhost:3001/api/v1/email', formData, config)
      .then(() => {
        hideError();
        setIsLoading(false);
        onClose();
      })
      .catch((err: any) => {
        console.log('email err', err);
        setIsLoading(false);
        showError('Waitlist registration failed. Please try again.');
      });
  }

  return (
    <EmailCapture onSubmit={onSubmit} onClose={onClose} />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(null, mapDispatchToProps)(EmailCaptureContainer);