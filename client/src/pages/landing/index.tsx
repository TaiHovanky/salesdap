import { Paper, Typography } from '@mui/material';
import React from 'react';

const LandingPage = () => {
  return (
    <>
      <Paper elevation={0} sx={{ backgroundColor: '#fff', height: '95vh', padding: '15rem' }}>
        <Typography variant='h4'>Salesdap is the leading digital account planning application for sales teams.</Typography>
        <Typography variant='subtitle1'>The goal is have your sales team focus on selling and not account mapping internally or with partners – ultimately, to build customer relationships.</Typography>
      </Paper>
      <Paper elevation={0} sx={{ backgroundColor: '#cccab5', height: '95vh', padding: '15rem' }}>
        <Typography variant='h4'>Using the Salesdap platform, Account Executives go from spending hours to often weeks on dreaded account mapping to completing it in a matter of minutes.</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>
          Wouldn’t you prefer to spend your valuable time building customer relationships, actually meeting with your customers, or help build the appropriate solution to solve your customers problems? 
        </Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>
          We solve that challenge for you. We accelerate the sales process by removing the obstacle of account mapping and ensure the right people get it in-front of the right customers, at the right time.
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ backgroundColor: '#1b5e20', height: '95vh', padding: '15rem', color: '#fff' }}>
        <Typography variant='h4'>Step 1: Upload account lists</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Upload your list and your partner rep's list and select the columns that would be used to find matching values between the lists.</Typography>
      </Paper>
      <Paper elevation={0} sx={{ backgroundColor: '#fffde7', height: '95vh', padding: '15rem' }}>
        <Typography variant='h4'>Step 2: View your results</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>See all the matching values.</Typography>
      </Paper>
      <Paper elevation={0} sx={{ backgroundColor: '#fff', height: '95vh', padding: '15rem' }}>
        <Typography variant='h4'>Step 3: Contact your partner rep</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Copy and paste our email template</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Download a copy of the results</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Contact your partner rep</Typography>
      </Paper>
    </>
  );
}

export default LandingPage;