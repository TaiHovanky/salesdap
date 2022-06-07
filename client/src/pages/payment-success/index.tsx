import React from 'react';
import { Box, Fab, Grid, TextField, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SuccessDisplay = () => {
  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);
  const history = useHistory();

  const sessionId = query.get('session_id');

  const handleManageSubscriptionClick = () => {
    axios.post('http://localhost:3001/api/v1/create-portal-session', { sessionId });
  }

  const handleHomeButtonClick = () => {
    history.push('/home');
  }

  return (
    <section>
      <Box sx={{ width: '100%', marginTop: '6.5vh' }}>
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
            p={0}
            sx={{ height: '100%' }}
            direction="column"
            alignItems="center"
          >
            <div className="product Box-root">
              <CheckCircle />
              <div className="description Box-root" style={{ display: 'inline-block', marginBottom: '3.5rem'}}>
                <Typography variant="h4">Subscribed to Salesdap!</Typography>
              </div>
            </div>
            {/* <form action="" method="POST"> */}
              {/* <TextField
                type="hidden"
                id="session-id"
                name="session_id"
                value={sessionId}
              /> */}
              <Fab variant="extended" id="checkout-and-portal-button" onClick={handleManageSubscriptionClick}>
                Manage your subscription
              </Fab>
            {/* </form> */}
            <Fab variant="extended" color='primary' id="home-button" sx={{ marginTop: '1.5rem'}} onClick={handleHomeButtonClick}>
              Get Started
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
}

export default SuccessDisplay;