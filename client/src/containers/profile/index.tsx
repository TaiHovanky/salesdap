import React from 'react';
import axios from 'axios';
import Profile from '../../pages/profile';
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

interface Props {
  user: UserState;
  setIsLoading: any;
  showError: any;
  hideError: any;
}

const ProfileContainer = ({
  user,
  setIsLoading,
  showError,
  hideError
}: Props) => {
  const handlePinnedFileClick = async () => {
    try {
      setIsLoading(true);
      const pinnedFileData = await getPinnedFile(user.pinnedFile);
      setIsLoading(false);
      createFileLink(pinnedFileData.data, user.pinnedFile);
    } catch (err: any) {
      console.log('err', err);
      setIsLoading(false);
      showError(`Failed to download pinned file. ${err}`);
    }
  };

  const validateFileSelection = (event: any) => {
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      hideError();
      handleFilePinning(document);
    } else {
      showError('Invalid file type. Only pin .xls, .xlsx, or .csv');
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
    axios.post('/api/v1/pinfile', formData)
      .then(() => {
        pinFileSuccess(file.name);
        hideError();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        showError(`Failed to pin file. ${err}`);
      });
  }

  return (
    <Profile
      user={user}
      validateFileSelection={validateFileSelection}
      handlePinnedFileClick={handlePinnedFileClick}
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
  pinFileSuccess: (filename: string) => dispatch(pinFileSuccess(filename))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);