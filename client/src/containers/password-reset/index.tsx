import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import PasswordReset from '../../pages/password-reset';
import { connect } from 'react-redux';
import { hideError, showError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface Props {
  setIsLoading: any;
  showError: any;
  hideError: any;
}

const PasswordResetContainer = ({ setIsLoading, showError, hideError }: Props) => {
  const history = useHistory();
  const params: any = useParams();

  useEffect(() => {
    axios.post('/api/v1/resetpassword', { token: params.token })
      .catch((err) => {
        history.push('/');
      });
  }, [params, history]);

  const onSubmit = (values: any) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    setIsLoading(true);
    axios.post('/api/v1/updatepassword', formData, config)
      .then((res) => {
        hideError();
        setIsLoading(false);
        history.push('/');
      })
      .catch((err: any) => {
        setIsLoading(false);
        showError('Password reset failed. Please try again.')
      });
  };

  return (
    <PasswordReset onSubmit={onSubmit} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(null, mapDispatchToProps)(PasswordResetContainer);