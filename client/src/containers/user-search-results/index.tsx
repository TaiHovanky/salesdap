import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateSearchResults } from '../../state/actions/user-search';
import { UserSearchState } from '../../state/reducers/user-search';
import UserSearchResults from '../../pages/user-search-results';
import { useHistory } from 'react-router-dom';
import { setUserForProfilePage } from '../../state/actions/profile';
import { UserState } from '../../state/reducers/user';

interface Props {
  userSearch: UserSearchState;
  setUserForProfilePage: any;
}

const UserSearchResultsContainer = ({ userSearch, setUserForProfilePage }: Props) => {
  const history = useHistory();

  const handleUserCardClick = (user: any) => {
    setUserForProfilePage(user);
    history.push('/profile')
  };

  return (
    <UserSearchResults users={userSearch.users} handleUserCardClick={handleUserCardClick} />
  );
}

const mapStateToProps = (state: any) => ({
  userSearch: state.userSearch
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSearchResults: (users: Array<any>) => dispatch(updateSearchResults(users)),
  setUserForProfilePage: (user: UserState) => dispatch(setUserForProfilePage(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResultsContainer);