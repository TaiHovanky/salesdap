import React from 'react';
import PinnedFileDropdown from '../../components/pinned-file-dropdown';
import { connect } from 'react-redux';
import { selectDocument, selectPinnedFile } from '../../state/actions/document';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { createJSONFromSpreadsheet, getPinnedFile } from '../../utils/spreadsheet.utils';

interface Props {
  showError: any;
  hideError: any;
  setIsLoading: any;
  selectDocument: any;
  selectedPinnedFileId: any;
  selectPinnedFile: any;
  pinnedFiles: Array<any>;
  index: number;
}

const PinnedFileDropdownContainer = ({
  showError,
  hideError,
  setIsLoading,
  selectDocument,
  selectedPinnedFileId,
  selectPinnedFile,
  pinnedFiles,
  index
}: Props) => {

  const handlePinnedFileSelection = async (event: any) => {
    console.log('event', event)
    const fileId: string = event.target.value;
    selectPinnedFile(fileId);
    setIsLoading(true);
    try {
      const pinnedFileBlob = await getPinnedFile(fileId);
      const wsDataObj: Array<any> = await createJSONFromSpreadsheet(pinnedFileBlob.data);
      selectDocument(wsDataObj, index, fileId, pinnedFileBlob.data);
      hideError();
      setIsLoading(false);
    } catch (err: any) {
      console.log('err', err);
      showError('Failed to get pinned file for user.');
      setIsLoading(false);
      setTimeout(() => {
        hideError();
      }, 5000);
    }
  }

  return (
    <PinnedFileDropdown
      handlePinnedFileSelection={handlePinnedFileSelection}
      selectedPinnedFileId={selectedPinnedFileId}
      pinnedFiles={pinnedFiles}
    />
  );
}

const mapStateToProps = (state: any) => ({
  pinnedFiles: state.user.pinnedFiles,
  selectedPinnedFileId: state.document.selectedPinnedFileId
})

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  selectDocument: (wsDataObj: any, index: number, filename: string, fileBlob: any) => dispatch(selectDocument(wsDataObj, index, filename, fileBlob)),
  selectPinnedFile: (pinnedFileId: string) => dispatch(selectPinnedFile(pinnedFileId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PinnedFileDropdownContainer);