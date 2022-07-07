import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Fab,
  IconButton,
} from '@mui/material';
import { Attachment, Upload, Payment as PaymentIcon, Edit } from '@mui/icons-material';
import { UserState } from '../../state/reducers/user';
import InfoTooltip from '../../components/info-tooltip';
import EditProfileFormContainer from '../../containers/edit-profile-form';
import PinnedFileCardContainer from '../../containers/pinned-file-card';
import EditPinnedFileModal from '../../components/edit-pinned-file-modal';
import ProfileInfoCard from '../../components/profile-info-card';

interface Props {
  user: UserState;
  validateFileSelection: any;
  handlePinnedFileClick: any;
  handleManageSubscriptionClick: any;
  handleCreateCheckoutSession: any;
}

const Profile = ({
  user,
  validateFileSelection,
  handlePinnedFileClick,
  handleManageSubscriptionClick,
  handleCreateCheckoutSession,
}: Props) => {
  const inputFileRef: any = useRef(null);

  const handleFileSelectionBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef&& inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '3.5vh' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <Grid
            item
            container
            xs={6}
            sx={{ height: '100%' }}
            direction="column"
            justifyContent="center"
            // alignItems="center"
          >
            <ProfileInfoCard user={user} handleManageSubscriptionClick={handleManageSubscriptionClick} handleCreateCheckoutSession={handleCreateCheckoutSession} />
            {/* <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Pinned Files <EditPinnedFileModal /></Typography> */}
            <PinnedFileCardContainer pinnedFiles={user.pinnedFiles} />
            {/* <PinnedFileCardContainer pinnedFile={{ label: 'file for Sailpoint', name: 'sailpoint-related sales accounts', id: '34wef3', pinned_filename: 'jr-sailpoint-list' }} /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;