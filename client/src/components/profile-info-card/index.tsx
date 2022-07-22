import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  Fab,
  IconButton,
} from '@mui/material';
import { Payment as PaymentIcon, Edit } from '@mui/icons-material';
import { UserState } from '../../state/reducers/user';
import EditProfileFormContainer from '../../containers/edit-profile-form';

interface Props {
  user: UserState;
  handleManageSubscriptionClick: any;
  handleCreateCheckoutSession: any;
  isViewingSomeonElsesProfile: boolean;
}

const ProfileInfoCard = ({
  user,
  handleManageSubscriptionClick,
  handleCreateCheckoutSession,
  isViewingSomeonElsesProfile
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  console.log('is view some ones profile', isViewingSomeonElsesProfile)

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    if (user && user.activeSubscription === true) {
      setHasActiveSubscription(true);
    }
  }, [user, isEditing])

  return (
    <Paper elevation={3} sx={{ width: '100%', padding: '3rem', margin: '3rem 0 0 0' }}>
      <Typography variant="h6">User Info {!isViewingSomeonElsesProfile && <IconButton onClick={handleEditButtonClick}><Edit /></IconButton>}</Typography>
      <Grid
        container
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <Grid
          item
          container
          xs={6}
          sx={{ height: '100%', padding: '0 0.5rem' }}
          direction="column"
          justifyContent="start"
          alignItems="start"
        >
          {isEditing ?
            <EditProfileFormContainer /> :
            <>
              <Typography variant="subtitle1" className="profile-info-text">Name: {user.firstname} {user.lastname}</Typography>
              <Typography variant="subtitle1" className="profile-info-text">Email: {user.email}</Typography>
              <Typography variant="subtitle1" className="profile-info-text">Company: {user.company}</Typography>
            </>
          }
        </Grid>
        {!isViewingSomeonElsesProfile && <Grid
          item
          container
          xs={6}
          sx={{ height: '100%', padding: '0 0.5rem' }}
          direction="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography variant="subtitle1" className="profile-info-text">Subscription Type: {user.subscriptionType}</Typography>
          <Typography variant="subtitle1" className="profile-info-text">Paid Subscription: {user.activeSubscription ? 'Yes' : 'No'}</Typography>
        </Grid>}
        {!isViewingSomeonElsesProfile && <Grid
          item
          container
          xs={12}
          p={0}
          direction="column"
          justifyContent="start"
          alignItems="center"
        >
          {hasActiveSubscription ?
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '0.5rem', minWidth: '208px' }}
              onClick={handleManageSubscriptionClick}
            >
              <PaymentIcon sx={{ mr: 1 }} />
              Manage Subscription
            </Fab> :
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '0.5rem', minWidth: '208px' }}
              onClick={() => handleCreateCheckoutSession(user.email)}
            >
              <PaymentIcon sx={{ mr: 1 }} />
              Upgrade Subscription
            </Fab>
          }
        </Grid>}
      </Grid>
    </Paper>
  );
}

export default ProfileInfoCard;