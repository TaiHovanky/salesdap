import React from 'react';
import axios from 'axios';
import NavBar from '../../components/nav-bar';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../state/actions/user';
import { showError, hideError } from '../../state/actions/alert';
import { UserState, initialState } from '../../state/reducers/user';
import { setAccessToken } from '../../utils/access-token.utils';

interface Props {
  user: UserState;
  hideError: any;
  updateUser: any;
}

const NavBarContainer = ({ user, hideError, updateUser }: Props) => {
  const history = useHistory();

  const handleLogout = () => {
    axios.post('/api/v1/logout')
      .then(() => {
        hideError();
        updateUser({...initialState});
        setAccessToken('');
        history.push('/');
      })
      .catch((err) => {
        showError('Failed to logout');
        setTimeout(() => {
          hideError();
        }, 5000);
      });
  }

  return (
    <NavBar user={user} handleLogout={handleLogout} hideError={hideError} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  updateUser: (user: any) => dispatch(updateUser(user))
});

export default connect(null, mapDispatchToProps)(NavBarContainer);