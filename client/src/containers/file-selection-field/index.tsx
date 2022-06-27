import React from 'react';
import { connect } from 'react-redux';
import FileSelectionField from '../../components/file-selection-field';
import { pinFileSuccess, selectDocument } from '../../state/actions/document';
import { showError, hideError, showSuccess, hideSuccess } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { checkIsValidFileType } from '../../utils/validate-file-type';
import { createJSONFromSpreadsheet } from '../../utils/spreadsheet.utils';
import { getAccessToken } from '../../utils/access-token.utils';
import axios from 'axios';
import { UserState } from '../../state/reducers/user';

interface Props {
  selectedDocument: any;
  showError: any;
  hideError: any;
  setIsLoading: any;
  selectDocument: any;
  index: number;
  user: UserState;
  pinFileSuccess: any;
  showSuccess: any;
  hideSuccess: any;
}

const FileSelectionFieldContainer = ({
  selectedDocument,
  showError,
  hideError,
  setIsLoading,
  selectDocument,
  index,
  user,
  pinFileSuccess,
  showSuccess,
  hideSuccess
}: Props) => {

  /**
   * When the user selects a document, validate the file type
   * @param event 
   */
   const validateAndSetFileSelection = async (event: any, index: number) => {
    setIsLoading(true);
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      hideError();
      const wsDataObj: Array<any> = await createJSONFromSpreadsheet(document);
      selectDocument(wsDataObj, index, document.name, document);
      setIsLoading(false);
    } else {
      showError('Invalid file type. Only .xls, .xlsx, or .csv files can be processed.');
    }
  };

  const handleFilePinning = (file: any) => {
    setIsLoading(true);
    const formData = new FormData();
    if (
      file &&
      file.name
    ) {
      formData.append(
        'sales_file',
        file,
        file.name
      );
      formData.append(
        'email',
        user.email
      );
    }
    axios.post('/api/v1/pinfile', formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then((res: any) => {
        pinFileSuccess(res.data);
        hideError();
        setIsLoading(false);
        showSuccess('Successfully pinned file');
        setTimeout(() => {
          hideSuccess();
        }, 5000);
      })
      .catch(() => {
        setIsLoading(false);
        showError('Failed to pin file');
        setTimeout(() => {
          hideError();
        }, 7500)
      });
  }

  return (
    <FileSelectionField
      selectedDocument={selectedDocument}
      validateAndSetFileSelection={validateAndSetFileSelection}
      index={index}
      handleFilePinning={handleFilePinning}
      user={user}
    />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  showSuccess: (message: string) => dispatch(showSuccess(message)),
  hideSuccess: () => dispatch(hideSuccess()),
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  selectDocument: (wsDataObj: any, index: number, filename: string, document: any) => dispatch(selectDocument(wsDataObj, index, filename, document)),
  pinFileSuccess: (fileMetadata: any) => dispatch(pinFileSuccess(fileMetadata)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileSelectionFieldContainer);