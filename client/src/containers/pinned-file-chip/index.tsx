import React from 'react';
import { connect } from 'react-redux';
import PinnedFileChip from '../../components/pinned-file-chip';
import { hideError, showError } from '../../state/actions/alert';
import { UserState } from '../../state/reducers/user';
import { createFileLink, getPinnedFile } from '../../utils/spreadsheet.utils';

interface Props {
  user: UserState;
  showError: any;
  hideError: any;
}

const PinnedFileChipContainer = ({ user, showError, hideError }: Props) => {
  const handlePinnedFileClick = async () => {
    try {
      const pinnedFileData = await getPinnedFile(user.pinnedFileId);
      createFileLink(pinnedFileData.data, user.pinnedFileName);
    } catch (err: any) {
      console.log('err', err);
      showError('Failed to download pinned file.');
    }
  };

  return (
    <PinnedFileChip user={user} handlePinnedFileClick={handlePinnedFileClick} />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PinnedFileChipContainer);