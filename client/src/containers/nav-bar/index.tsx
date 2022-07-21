import React from 'react';
import axios from 'axios';
import NavBar from '../../components/nav-bar';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../state/actions/user';
import { showError, hideError } from '../../state/actions/alert';
import { UserState, initialState } from '../../state/reducers/user';
import { getAccessToken, setAccessToken } from '../../utils/access-token.utils';
import { updateSearchResults } from '../../state/actions/user-search';

interface Props {
  user: UserState;
  hideError: any;
  updateUser: any;
  updateSearchResults: any;
}

const NavBarContainer = ({ user, hideError, updateUser, updateSearchResults }: Props) => {
  const history = useHistory();

  const handleLogout = () => {
    axios.post('http://localhost:3001/api/v1/logout')
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

  const handleSearch = (event: any, searchString: any) => {
    event.preventDefault();
    console.log('searching----', event, searchString);
    const formData = new FormData();
    formData.append('searchString', searchString);
    axios.post('http://localhost:3001/api/v1/search-users', formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then((data) => {
        hideError();
        console.log('data', data);
        updateSearchResults(data.data);
        history.push('/user-search');
      })
      .catch((err) => {
        showError('Failed to search for users');
        setTimeout(() => {
          hideError();
        }, 5000);
      });
  }

  return (
    <NavBar
      user={user}
      handleLogout={handleLogout}
      hideError={hideError}
      handleSearch={handleSearch}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  updateUser: (user: any) => dispatch(updateUser(user)),
  updateSearchResults: (users: Array<any>) => dispatch(updateSearchResults(users))
});

export default connect(null, mapDispatchToProps)(NavBarContainer);