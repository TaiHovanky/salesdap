import React from 'react';
import { connect } from 'react-redux';
import PinnedFileChip from '../../components/pinned-file-chip';
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState;
}

const PinnedFileChipContainer = ({ user }: Props) => {
  return (
    <PinnedFileChip user={user} />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PinnedFileChipContainer);