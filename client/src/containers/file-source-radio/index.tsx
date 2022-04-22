import React from 'react';
import FileSourceRadio from '../../components/file-source-radio';
import { connect } from 'react-redux';
import { selectDocument, setFileSource } from '../../state/actions/document';
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
  fileSource: string;
  user: UserState;
  index: number;
}

const FileSourceRadioContainer = ({
  showError,
  hideError,
  setIsLoading,
  selectDocument,
  setFileSource,
  fileSource,
  user,
  index
}: Props) => {

  const handleFileTypeChange = async (event: any, index: number) => {
    setFileSource(index, event.target.value);
    if (event.target.value === 'pinned') {
      setIsLoading(true);
      try {
        const pinnedFileBlob = await getPinnedFile(user.pinnedFileId);
        const wsDataObj: Array<any> = await createJSONFromSpreadsheet(pinnedFileBlob.data);
        selectDocument(wsDataObj, index, user.pinnedFileId);
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
    } else {
      selectDocument([], index, '');
    }
  }

  return (
    <FileSourceRadio
      handleFileTypeChange={handleFileTypeChange}
      fileSource={fileSource}
      index={index}
    />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  selectDocument: (wsDataObj: any, index: number, filename: string) => dispatch(selectDocument(wsDataObj, index, filename)),
  setFileSource: (index: number, event: any) => dispatch(setFileSource(index, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSourceRadioContainer);