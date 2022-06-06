import React from 'react';
import axios from 'axios';
import Register from '../../pages/register';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../state/actions/user';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface Props {
  setIsLoading: any;
  showError: any;
  hideError: any;
  updateUser: any;
}

const RegisterContainer = ({
  setIsLoading,
  showError,
  hideError,
  updateUser
}: Props) => {
  const history = useHistory();

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
      withCredentials: true
    };
    console.log('form data', formData, values);
    axios.post('http://localhost:3001/api/v1/register', formData, config)
      .then((res) => {
        hideError();
        updateUser(res.data);
        setIsLoading(false);
        history.push('/home');
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsLoading(false);
        showError('Registration failed.');
        setTimeout(() => {
          hideError();
        }, 5000)
      });
  }

  return (
    <Register onSubmit={onSubmit} setIsLoading={setIsLoading} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  updateUser: (user: any) => dispatch(updateUser(user))
});

export default connect(null, mapDispatchToProps)(RegisterContainer);