import React from 'react';
// import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../state/actions/user';
import { showError, hideError } from '../../state/actions/alert';
import NavBar from '../../components/nav-bar';
import { UserState, initialState } from '../../state/reducers/user';

interface Props {
  user: UserState;
  hideError: any;
  updateUser: any;
}

const NavBarContainer = ({ user, hideError, updateUser }: Props) => {
  const history = useHistory();

  const handleLogout = () => {
    // axios.post('http://localhost:3001/api/v1/logout') <-- until AWS Redis stuff gets setup, keep this commented
    //   .then(() => {
        // hideError();
        updateUser({...initialState});
        history.push('/');
      // })
      // .catch((err) => {
      //   console.log('logout err', err);
      //   showError('Failed to logout');
      //   setTimeout(() => {
      //     hideError();
      //   }, 5000);
      // });
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