import React, { useEffect } from 'react';
import axios from 'axios';
import {
  createFileLink,
  getPinnedFile
} from '../../utils/spreadsheet.utils';
import { connect } from 'react-redux';
import { pinFileSuccess } from '../../state/actions/document';
import { UserState } from '../../state/reducers/user';
import { checkIsValidFileType } from '../../utils/validate-file-type';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { getAccessToken } from '../../utils/access-token.utils';
import { updateUser } from '../../state/actions/user';
import EditPinnedFileModal from '../../components/edit-pinned-file-modal';

interface Props {
  user: UserState;
  setIsLoading: any;
  showError: any;
  hideError: any;
  pinFileSuccess: any;
  updateUser: any;
  isOpen: boolean;
  handleClose: any;
}

const EditPinnedFileModalContainer = ({
  user,
  setIsLoading,
  showError,
  hideError,
  pinFileSuccess,
  updateUser,
  isOpen,
  handleClose
}: Props) => {

  // const handlePinnedFileClick = async () => {
  //   try {
  //     setIsLoading(true);
  //     const pinnedFileData = await getPinnedFile(user.pinnedFileId);
  //     setIsLoading(false);
  //     createFileLink(pinnedFileData.data, user.pinnedFileName);
  //   } catch (err: any) {
  //     handleProfileActionFailure(err, 'Failed to download pinned file');
  //   }
  // };

  const validateFileSelection = (event: any) => {
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      hideError();
      // handleFilePinning(document);
    } else {
      showError('Invalid file type. Only pin .xls, .xlsx, or .csv');
    }
  };

  const handleFilePinning = (file: any, fileLabel: string) => {
    setIsLoading(true);
    const formData = new FormData();
    if (
      file &&
      file.name
    ) {
      formData.append('sales_file', file, file.name);
      formData.append('email', user.email);
      formData.append('file_label', fileLabel);
    }
    axios.post('http://localhost:3001/api/v1/pinfile', formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then((res: any) => {
        pinFileSuccess(res.data);
        hideError();
        setIsLoading(false);
      })
      .catch((err) => handleProfileActionFailure(err, 'Failed to pin file'));
  }

  const handleProfileActionFailure = (err: any, errorMessage: string) => {
    setIsLoading(false);
    showError(errorMessage);
    setTimeout(() => {
      hideError();
    }, 7500)
  }

  return (
    <EditPinnedFileModal
      isOpen={isOpen}
      handleClose={handleClose}
      validateFileSelection={validateFileSelection}
      // handlePinnedFileClick={handlePinnedFileClick}
      handleFilePinning={handleFilePinning}
    />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  pinFileSuccess: (fileMetadata: any) => dispatch(pinFileSuccess(fileMetadata)),
  updateUser: (user: any) => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPinnedFileModalContainer);