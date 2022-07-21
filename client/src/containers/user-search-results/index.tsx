import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateSearchResults } from '../../state/actions/user-search';
import { UserSearchState } from '../../state/reducers/user-search';

interface Props {
  userSearch: UserSearchState;
}

const UserSearchResultsContainer = ({ userSearch }: Props) => {

}

const mapStateToProps = (state: any) => ({
  userSearch: state.userSearch
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSearchResults: (users: Array<any>) => dispatch(updateSearchResults(users))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResultsContainer);