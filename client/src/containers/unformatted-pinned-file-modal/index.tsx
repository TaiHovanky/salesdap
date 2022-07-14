import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { pinFileSuccess } from '../../state/actions/document';
import { UserState } from '../../state/reducers/user';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { getAccessToken } from '../../utils/access-token.utils';
import UnformattedPinnedFileModal from '../../components/unformatted-pinned-file-modal';

interface Props {
  user: UserState;
  setIsLoading: any;
  showError: any;
  hideError: any;
  pinFileSuccess: any;
  isOpen: boolean;
  handleClose: any;
  unformattedData: string;
}

const UnformattedPinnedFileModalContainer = ({
  user,
  setIsLoading,
  showError,
  hideError,
  pinFileSuccess,
  isOpen,
  handleClose,
  unformattedData
}: Props) => {

  const handleFilePinning = (fileLabel: string, columnName: string) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('unformatted_data', unformattedData);

    if (fileLabel) {
      formData.append('file_label', fileLabel);
    }

    if (columnName) {
      formData.append('column_name', columnName);
    }
    console.log('form data afterwards-------------------', formData);

    axios.post('http://localhost:3001/api/v1/pin-unformatted-list', formData, {
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
    <UnformattedPinnedFileModal
      isOpen={isOpen}
      handleClose={handleClose}
      handleFilePinning={handleFilePinning}
    />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  unformattedData: state.document.unformattedData1
});

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  pinFileSuccess: (fileMetadata: any) => dispatch(pinFileSuccess(fileMetadata))
});

export default connect(mapStateToProps, mapDispatchToProps)(UnformattedPinnedFileModalContainer);