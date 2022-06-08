import React from 'react';
import { Box, Fab, Grid, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const SuccessDisplay = ({ handleManageSubscriptionClick }: any) => {
  const history = useHistory();

  const handleLoginButtonClick = () => {
    history.push('/login');
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
            <Fab variant="extended" id="checkout-and-portal-button" onClick={handleManageSubscriptionClick}>
              Manage your subscription
            </Fab>
            <Fab variant="extended" color='primary' id="login-button" sx={{ marginTop: '1.5rem'}} onClick={handleLoginButtonClick}>
              Get Started
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
}

export default SuccessDisplay;