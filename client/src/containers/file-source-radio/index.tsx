import React from 'react';
import FileSourceRadio from '../../components/file-source-radio';
import { connect } from 'react-redux';
import { selectDocument, selectPinnedFile, setFileSource } from '../../state/actions/document';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { createJSONFromSpreadsheet, getPinnedFile } from '../../utils/spreadsheet.utils';
import { UserState } from '../../state/reducers/user';

interface Props {
  showError: any;
  hideError: any;
  setIsLoading: any;
  selectDocument: any;
  setFileSource: any;
  selectedPinnedFileId: any;
  fileSource: string;
  selectPinnedFile: any;
  pinnedFiles: Array<any>;
  index: number;
}

const FileSourceRadioContainer = ({
  showError,
  hideError,
  setIsLoading,
  selectDocument,
  selectedPinnedFileId,
  setFileSource,
  selectPinnedFile,
  fileSource,
  pinnedFiles,
  index
}: Props) => {

  const handleFileTypeChange = async (event: any, index: number) => {
    setFileSource(index, event.target.value);
    if (event.target.value === 'upload') {
      selectDocument([], index, '');
    }
  }

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
    <FileSourceRadio
      handleFileTypeChange={handleFileTypeChange}
      handlePinnedFileSelection={handlePinnedFileSelection}
      fileSource={fileSource}
      selectedPinnedFileId={selectedPinnedFileId}
      pinnedFiles={pinnedFiles}
      index={index}
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
  setFileSource: (index: number, event: any) => dispatch(setFileSource(index, event)),
  selectPinnedFile: (pinnedFileId: string) => dispatch(selectPinnedFile(pinnedFileId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSourceRadioContainer);