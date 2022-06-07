import React from 'react';
import axios from 'axios';
import Register from '../../pages/register';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { updateRegistrationUser } from '../../state/actions/registration';

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
  updateRegistrationUser
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
        // updateUser(res.data);
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

  const createRegistrationUser = (values: any) => {
    updateRegistrationUser(values);
  }

  return (
    <Register onSubmit={onSubmit} setIsLoading={setIsLoading} createRegistrationUser={createRegistrationUser} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  updateRegistrationUser: (user: any) => dispatch(updateRegistrationUser(user))
});

export default connect(null, mapDispatchToProps)(RegisterContainer);