import React from 'react';
import { connect } from 'react-redux';
import PinnedFileChip from '../../components/pinned-file-chip';
import { hideError, showError } from '../../state/actions/alert';
import { UserState } from '../../state/reducers/user';
import { createFileLink, getPinnedFile } from '../../utils/spreadsheet.utils';

interface Props {
  showError: any;
  fileName?: string;
  fileId?: string;
}

const PinnedFileChipContainer = ({ fileName, fileId, showError }: Props) => {
  const handlePinnedFileClick = async () => {
    if (fileId && fileName) {
      try {
        const pinnedFileData = await getPinnedFile(fileId);
        createFileLink(pinnedFileData.data, fileName);
      } catch (err: any) {
        console.log('err', err);
        showError('Failed to download pinned file.');
      }
    }
  };

  return (
    <PinnedFileChip fileName={fileName} handlePinnedFileClick={handlePinnedFileClick} />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
});

export default connect(null, mapDispatchToProps)(PinnedFileChipContainer);