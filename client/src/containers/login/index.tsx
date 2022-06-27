import React, { useEffect } from 'react';
import axios from 'axios';
import Login from '../../pages/login';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../state/actions/user';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { setAccessToken } from '../../utils/access-token.utils';

axios.defaults.withCredentials = true; // this fixed the cookie issue

interface Props {
  showError: any;
  hideError: any;
  setIsLoading: any;
  updateUser: any;
}

const LoginContainer = ({
  showError,
  hideError,
  setIsLoading,
  updateUser
}: Props) => {
  const history = useHistory();

  const handleLoginSuccess = (res: any) => {
    const { token, email } = res.data;
    setAccessToken(token);
    hideError();
    setIsLoading(false);
    if (res.data && email) {
      updateUser(res.data);
      history.push('/home');
    }
  }

  const handleLoginFailure = (err: any) => {
    console.log('err', err);
    setIsLoading(false);
    showError('Wrong email or password');
  }

  useEffect(() => {
    setIsLoading(true);
    axios.post('/api/v1/refresh_token', null, { withCredentials: true })
      .then(handleLoginSuccess)
      .catch(handleLoginFailure);
  }, []);

  const onSubmit = (values: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // withCredentials: true
    };

    axios.post('/api/v1/login', formData, config)
      .then(handleLoginSuccess)
      .catch(handleLoginFailure);
  };

  return (
    <Login onSubmit={onSubmit} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  updateUser: (user: any) => dispatch(updateUser(user))
});

export default connect(null, mapDispatchToProps)(LoginContainer);