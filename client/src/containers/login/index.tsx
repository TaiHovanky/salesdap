import React, { useEffect } from 'react';
import axios from 'axios';
import Login from '../../pages/login';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../state/actions/user';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { setAccessToken } from '../../utils/access-token.utils';

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

  useEffect(() => {
    setIsLoading(true);
    axios.post("http://localhost:3001/api/v1/refresh_token", {
      refreshToken: localStorage.getItem('sdtr')
    }).then((res: any) => {
      console.log('data', res.data);
      setAccessToken(res.data.token);
      localStorage.setItem('sdtr', res.data.refreshToken);
      hideError();
      setIsLoading(false);
      if (res.data && res.data.email) {
        updateUser(res.data);
        history.push('/home');
      }
    });
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

    axios.post('http://localhost:3001/api/v1/login', formData, config)
      .then((res: any) => {
        console.log('res login', res.data);
        setAccessToken(res.data.token);
        if (res.data.refreshToken) {
          localStorage.setItem('sdtr', res.data.refreshToken);
        }
        hideError();
        updateUser(res.data);
        setIsLoading(false);
        history.push('/home');
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsLoading(false);
        showError('Wrong email or password');
      });
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