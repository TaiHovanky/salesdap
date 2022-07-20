import React from 'react';
import FileSourceRadio from '../../components/file-source-radio';
import { connect } from 'react-redux';
import { selectDocument, setFileSource } from '../../state/actions/document';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface Props {
  selectDocument: any;
  setFileSource: any;
  fileSource: string;
  handleOpenFileSourceHelpModal: any;
  index: number;
}

const FileSourceRadioContainer = ({
  selectDocument,
  setFileSource,
  fileSource,
  handleOpenFileSourceHelpModal,
  index
}: Props) => {

  const handleFileTypeChange = async (event: any, index: number) => {
    setFileSource(index, event.target.value);
    if (event.target.value === 'upload') {
      selectDocument([], index, '');
    }
  }

  return (
    <FileSourceRadio
      handleFileTypeChange={handleFileTypeChange}
      handleOpenFileSourceHelpModal={handleOpenFileSourceHelpModal}
      fileSource={fileSource}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSourceRadioContainer);