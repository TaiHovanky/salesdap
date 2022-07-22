import React, { useEffect } from 'react';
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
import { getAccessToken } from '../../utils/access-token.utils';
import { updateUser } from '../../state/actions/user';
import { setAccessToken } from '../../utils/access-token.utils';

interface Props {
  user: UserState;
  setIsLoading: any;
  showError: any;
  hideError: any;
  pinFileSuccess: any;
  updateUser: any;
}

const ProfileContainer = ({
  user,
  setIsLoading,
  showError,
  hideError,
  pinFileSuccess,
  updateUser
}: Props) => {
  useEffect(() => {
    const checkSubscriptionAndRefreshAuth = async () => {
      if (!user || !user.email) {
        setIsLoading(true);
        const query = new URLSearchParams(window.location.search);
        const sessionId: string | null = query.get('http://localhost:3001session_id');
        if (sessionId) {
          await updateCustomerSubscriptionInfo(sessionId);
        }
        await refreshUserAuthStatus();
      }
    };
    checkSubscriptionAndRefreshAuth();
  }, []);

  const handlePinnedFileClick = async (pinnedFile: any) => {
    console.log('pinned file clicked', pinnedFile)
    try {
      setIsLoading(true);
      const pinnedFileData = await getPinnedFile(pinnedFile.pinned_file_id);
      setIsLoading(false);
      createFileLink(pinnedFileData.data, pinnedFile.file_name);
    } catch (err: any) {
      handleProfileActionFailure(err, 'Failed to download pinned file');
    }
  };

  const handleCreateCheckoutSession = (email: string) => {
    return axios.post('http://localhost:3001/api/v1/create-checkout-session', {
      customerEmail: email, isComingFromProfilePage: true
    })
      .then((res) => {
        hideError();
        setIsLoading(false);
        if (!!res && !!res.data) {
          window.location.href = res.data.url;
        }
      })
      .catch((err: any) => handleProfileActionFailure(err, 'Failed to create payment session'));
  }

  const handleManageSubscriptionClick = () => {
    setIsLoading(true);
    axios.post('http://localhost:3001/api/v1/create-portal-session', { email: user.email, isComingFromProfilePage: true })
      .then((res: any) => {
        setIsLoading(false);
        hideError();
        if (!!res && !!res.data) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => handleProfileActionFailure(err, 'There was a problem with connecting with the subscription portal'));
  }

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
    console.log('err', err);
    setIsLoading(false);
    showError(errorMessage);
    setTimeout(() => {
      hideError();
    }, 7500)
  }

  const handleProfileLoginSuccess = (res: any) => {
    const { token, email } = res.data;
    setAccessToken(token);
    hideError();
    setIsLoading(false);

    if (res.data && email) {
      updateUser(res.data);
    }
  }

  const updateCustomerSubscriptionInfo = (sessionId: string | null) => {
    return axios.post('http://localhost:3001/api/v1/order-success', { sessionId })
      .catch(() => {
        showError('Problem with user registration');
      });
  }

  const refreshUserAuthStatus = () => {
    return axios.post('http://localhost:3001/api/v1/refresh_token', null, { withCredentials: true })
      .then(handleProfileLoginSuccess)
      .catch((err: any) => handleProfileActionFailure(err, 'failed to load profile'));
  }

  return (
    <Profile
      user={user}
      validateFileSelection={validateFileSelection}
      handlePinnedFileClick={handlePinnedFileClick}
      handleManageSubscriptionClick={handleManageSubscriptionClick}
      handleCreateCheckoutSession={handleCreateCheckoutSession}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);