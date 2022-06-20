import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const ContactUs = () => {
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
              <Typography variant="h5">Contact Us</Typography>
              <Typography variant="body2">For assistance with issues, send an email to salesdaphelp@gmail.com</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ContactUs;