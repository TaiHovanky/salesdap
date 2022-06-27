import React from 'react';
import axios from 'axios';
import EditProfileForm from '../../components/edit-profile-form';
import { connect } from 'react-redux';
import { UserState } from '../../state/reducers/user';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { getAccessToken } from '../../utils/access-token.utils';
import { updateUser } from '../../state/actions/user';

interface Props {
  user: UserState;
  setIsLoading: any;
  showError: any;
  hideError: any;
  updateUser: any;
}

const EditProfileFormContainer = ({
  user,
  setIsLoading,
  showError,
  hideError,
  updateUser
}: Props) => {

  const handleProfileActionFailure = (err: any, errorMessage: string) => {
    console.log('err', err);
    setIsLoading(false);
    showError(errorMessage);
    setTimeout(() => {
      hideError();
    }, 7500)
  }

  const onSubmit = (values: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('firstname', values.firstName);
    formData.append('lastname', values.lastName);
    formData.append('company', values.company);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAccessToken()}`
      }
    };

    return axios.post('/api/v1/edit-profile', formData, config)
    .then((res: any) => {
      updateUser(res.data);
      hideError();
      setIsLoading(false);
    })
    .catch((err: any) => handleProfileActionFailure(err, 'Profile update failed'));
  }

  return (
    <EditProfileForm
      user={user}
      onSubmit={onSubmit}
    />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  updateUser: (user: any) => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileFormContainer);