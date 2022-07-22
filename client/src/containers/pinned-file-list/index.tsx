import React from 'react';
import { connect } from 'react-redux';
import PinnedFileList from '../../components/pinned-file-list';
import { hideError, showError } from '../../state/actions/alert';

const PinnedFileListContainer = ({ pinnedFiles, isViewingSomeonElsesProfile }: any) => {
  return (
    <PinnedFileList
      pinnedFiles={pinnedFiles}
      isViewingSomeonElsesProfile={isViewingSomeonElsesProfile}
    />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
});

export default connect(null, mapDispatchToProps)(PinnedFileListContainer);
