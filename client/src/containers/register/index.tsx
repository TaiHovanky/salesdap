import React from 'react';
import axios from 'axios';
import Register from '../../pages/register';
import { connect } from 'react-redux';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { FREE, PREMIUM } from '../../state/reducers/user';
import { useHistory } from 'react-router-dom';

interface Props {
  setIsLoading: any;
  showError: any;
  hideError: any;
  updateRegistrationUser: any;
}

const RegisterContainer = ({
  setIsLoading,
  showError,
  hideError,
}: Props) => {
  const history = useHistory();

  const handleCreateCheckoutSession = (email: string) => {
    return axios.post('http://localhost:3001/api/v1/create-checkout-session', {
      customerEmail: email
    })
      .then((res) => {
        if (!!res && !!res.data) {
          window.location.href = res.data.url;
        }
      })
      .catch((err: any) => handleRegistrationFailure(err, 'There was a problem with accessing the payments page'));
  }

  const onSubmit = (values: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('firstname', values.firstName);
    formData.append('lastname', values.lastName);
    formData.append('company', values.company);
    formData.append('subscriptionType', values.subscriptionType);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    };

    axios.post('http://localhost:3001/api/v1/register', formData, config)
      .then(() => {
        if (values.subscriptionType === PREMIUM) {
          handleCreateCheckoutSession(values.email);
        }
        return;
      })
      .then(() => {
        hideError();
        setIsLoading(false);
        if (values.subscriptionType === FREE) {
          history.push('/profile');
        }
      })
      .catch((err: any) => handleRegistrationFailure(err, 'Registration failed'));
  }

  const handleRegistrationFailure = (err: any, errorMessage: string) => {
    console.log('err', err);
    setIsLoading(false);
    showError(errorMessage);
    setTimeout(() => {
      hideError();
    }, 5000);
  }

  return (
    <Register onSubmit={onSubmit} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(null, mapDispatchToProps)(RegisterContainer);