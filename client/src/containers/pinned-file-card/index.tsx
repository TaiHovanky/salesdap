import React from 'react';
import { connect } from 'react-redux';
import PinnedFileCard from '../../components/pinned-file-card';
import { hideError, showError } from '../../state/actions/alert';
import { createFileLink, getPinnedFile } from '../../utils/spreadsheet.utils';

const PinnedFileCardContainer = ({ pinnedFiles, showError }: any) => {
  const handlePinnedFileClick = async (file: any) => {
    try {
      const pinnedFileData = await getPinnedFile(file.id);
      // createFileLink(pinnedFileData.data, pinnedFile.name);
    } catch (err: any) {
      console.log('err', err);
      showError('Failed to download pinned file.');
    }
  };

  return (
    <PinnedFileCard handlePinnedFileClick={handlePinnedFileClick} pinnedFiles={pinnedFiles} />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
});

export default connect(null, mapDispatchToProps)(PinnedFileCardContainer);
