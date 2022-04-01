import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import { connect } from 'react-redux';
import NavBar from '../../components/nav-bar';
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState
}

const Profile = ({ user }: Props) => {
  return (
    <>
      <NavBar />
      <Box sx={{ width: '100%', height: '80vh', marginTop: '3.5vh' }}>
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
            <Paper elevation={3} sx={{ width: '100%', padding: '3rem 0 3rem 3rem', marginTop: '3rem' }}>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Profile</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Name: {user.firstname} {user.lastname}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Email: {user.email}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Company: {user.company}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);