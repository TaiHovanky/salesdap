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
  existingPinnedFile?: any;
}

const PinnedFileChipContainer = ({ fileName, fileId, showError, existingPinnedFile }: Props) => {
  const handlePinnedFileClick = async (existingPinnedFile: any) => {
    console.log('hpf click', existingPinnedFile);
    if (existingPinnedFile) {
      try {
        const pinnedFileData = await getPinnedFile(existingPinnedFile.pinned_file_id);
        console.log('pined file data', pinnedFileData);
        createFileLink(pinnedFileData.data, existingPinnedFile.file_name);
      } catch (err: any) {
        console.log('err', err);
        showError('Failed to download pinned file.');
      }
    }
  };

  return (
    <PinnedFileChip
      fileName={fileName}
      handlePinnedFileClick={handlePinnedFileClick}
      existingPinnedFile={existingPinnedFile}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
});

export default connect(null, mapDispatchToProps)(PinnedFileChipContainer);