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
import { useFormik } from 'formik';
import { UserState } from '../../state/reducers/user';
import InfoTooltip from '../../components/info-tooltip';
import EditProfileFormContainer from '../../containers/edit-profile-form';

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

  const [isEditing, setIsEditing] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  const handleFileSelectionBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef&& inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    if (user && user.activeSubscription === true) {
      setHasActiveSubscription(true);
    }
  }, [user, isEditing])

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '3.5vh' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid
            item
            container
            xs={8}
            p={0}
            sx={{ height: '100%' }}
            direction="column"
            justifyContent="start"
            alignItems="center"
          >
            <Paper elevation={3} sx={{ width: '100%', padding: '3rem 0 3rem 3rem', margin: '3rem auto 3rem auto' }}>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Profile <IconButton onClick={handleEditButtonClick}><Edit /></IconButton></Typography>
              {isEditing ?
                <EditProfileFormContainer /> :
                <>
                  <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Name: {user.firstname} {user.lastname}</Typography>
                  <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Email: {user.email}</Typography>
                  <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Company: {user.company}</Typography>
                </>
              }
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Subscription Type: {user.subscriptionType}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Paid Subscription: {user.activeSubscription ? 'Yes' : 'No'}</Typography>
              <Typography variant="subtitle1">Pinned File:</Typography>
              <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFileName} />
              <Grid
                item
                container
                xs={6}
                p={0}
                direction="column"
                justifyContent="start"
                alignItems="start"
              >
                <InfoTooltip
                  arrow
                  placement="top-start"
                  open={!user.pinnedFileId}
                  title="Upload and 'pin' a list that you will regularly be comparing to partner account lists"
                >
                  <Fab
                    variant="extended"
                    aria-label="add"
                    sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                    onClick={handleFileSelectionBtnClick}
                  >
                    <Upload sx={{ mr: 1 }} />
                    Select Pinned File
                  </Fab>
                </InfoTooltip>
                <input
                  type="file"
                  ref={inputFileRef}
                  className="file-input"
                  onChange={validateFileSelection}
                  name="sales_file"
                />
                {hasActiveSubscription ?
                  <Fab
                    variant="extended"
                    aria-label="add"
                    sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                    onClick={handleManageSubscriptionClick}
                  >
                    <PaymentIcon sx={{ mr: 1 }} />
                    Manage Subscription
                  </Fab> :
                  <Fab
                    variant="extended"
                    aria-label="add"
                    sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                    onClick={() => handleCreateCheckoutSession(user.email)}
                  >
                    <PaymentIcon sx={{ mr: 1 }} />
                    Upgrade Subscription
                  </Fab>
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;