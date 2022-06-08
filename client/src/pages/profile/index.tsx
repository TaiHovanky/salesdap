import React, { useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Fab,
} from '@mui/material';
import { Attachment, Upload } from '@mui/icons-material';
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState;
  validateFileSelection: any;
  handlePinnedFileClick: any;
  handleManageSubscriptionClick: any;
}

const Profile = ({
  user,
  validateFileSelection,
  handlePinnedFileClick,
  handleManageSubscriptionClick
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
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Profile</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Name: {user.firstname} {user.lastname}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Email: {user.email}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Company: {user.company}</Typography>
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
                <Fab
                  variant="extended"
                  aria-label="add"
                  sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                  onClick={handleFileSelectionBtnClick}
                >
                  <Upload sx={{ mr: 1 }} />
                  Select Pinned File
                </Fab>
                <input
                  type="file"
                  ref={inputFileRef}
                  className="file-input"
                  onChange={validateFileSelection}
                  name="sales_file"
                />
                <Fab
                  variant="extended"
                  aria-label="add"
                  sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                  onClick={handleManageSubscriptionClick}
                >
                  <Upload sx={{ mr: 1 }} />
                  Manage Subscription
                </Fab>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;