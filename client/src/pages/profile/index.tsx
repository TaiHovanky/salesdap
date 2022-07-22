import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import { UserState } from '../../state/reducers/user';
import PinnedFileListContainer from '../../containers/pinned-file-list';
import ProfileInfoCard from '../../components/profile-info-card';

interface Props {
  user: UserState;
  validateFileSelection: any;
  handlePinnedFileClick: any;
  handleManageSubscriptionClick: any;
  handleCreateCheckoutSession: any;
  isViewingSomeonElsesProfile: boolean;
  currentSelectedUserProfile: UserState;
}

const Profile = ({
  user,
  handleManageSubscriptionClick,
  handleCreateCheckoutSession,
  isViewingSomeonElsesProfile,
  currentSelectedUserProfile
}: Props) => {
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
            <ProfileInfoCard
              user={currentSelectedUserProfile}
              handleManageSubscriptionClick={handleManageSubscriptionClick}
              handleCreateCheckoutSession={handleCreateCheckoutSession}
              isViewingSomeonElsesProfile={isViewingSomeonElsesProfile}
            />
            {/* <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Pinned Files <EditPinnedFileModal /></Typography> */}
            <PinnedFileListContainer
              pinnedFiles={currentSelectedUserProfile.pinnedFiles || []}
              isViewingSomeonElsesProfile={isViewingSomeonElsesProfile}
            />
            {/* <PinnedFileListContainer pinnedFile={{ label: 'file for Sailpoint', name: 'sailpoint-related sales accounts', id: '34wef3', pinned_filename: 'jr-sailpoint-list' }} /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;