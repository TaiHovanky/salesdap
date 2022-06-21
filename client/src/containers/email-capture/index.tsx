import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setIsLoading } from '../../state/actions/loading';
import { showError, hideError, showSuccess, hideSuccess } from '../../state/actions/alert';
import EmailCapture from '../../pages/email-capture';

interface Props {
  onClose: any;
  showError: any;
  hideError: any;
  showSuccess: any;
  hideSuccess: any;
  setIsLoading: any;
}

const EmailCaptureContainer = ({
  onClose,
  showError,
  hideError,
  showSuccess,
  hideSuccess,
  setIsLoading
}: Props) => {
  const onSubmit = (values: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    axios.post('/api/v1/email', formData, config)
      .then(() => {
        hideError();
        setIsLoading(false);
        onClose();
        showSuccess('Successfully registered to waitlist!');
        setTimeout(() => {
          hideSuccess();
        }, 5000);
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsLoading(false);
        showError('Waitlist registration failed. Please try again.');
        setTimeout(() => {
          hideError();
        }, 5000)
      });
  }

  return (
    <EmailCapture onSubmit={onSubmit} onClose={onClose} />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  showSuccess: (successMsg: string) => dispatch(showSuccess(successMsg)),
  hideSuccess: () => dispatch(hideSuccess()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(null, mapDispatchToProps)(EmailCaptureContainer);