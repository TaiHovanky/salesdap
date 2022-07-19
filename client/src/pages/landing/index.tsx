import { Grid, Paper, Typography } from '@mui/material';
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

      {/* how to section 1 */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        sx={{ height: '95vh'}}
      >
        <Grid
          item
          container
          xs={7}
          p={0}
          sx={{ width: '100%', color: '#fff' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '6rem', marginRight: '3rem', padding: '4rem', backgroundColor: '#4c8c4a' }}>
            <img className='how-to-img' src='/salesdap home page.png' />
          </Paper>
        </Grid>
        <Grid
          item
          container
          xs={5}
          p={0}
          sx={{ width: '100%', backgroundColor: '#fff', color: '#fff', }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '4rem', marginRight: '4rem', padding: '1rem'}}>
            <Typography variant="h4" sx={{ textDecoration: 'underline' }}>Compare account lists</Typography>
            <Typography variant="body1" sx={{ marginTop: '1rem'}}>Upload your list and your partner rep's list. Select the columns that would be used to find matching values (usually website and DUNS).
            To do this, use the search bar or use the data table visualizer. Hit the Upload and Compare button, and voila!</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* how to section 2 */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        sx={{ height: '95vh'}}
      >
        <Grid
          item
          container
          xs={5}
          p={0}
          sx={{ width: '100%', backgroundColor: '#fff', color: '#fff', }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '4rem', marginRight: '4rem', padding: '1rem'}}>
            <Typography variant="h4" sx={{ textDecoration: 'underline' }}>View matches</Typography>
            <Typography variant="body1" sx={{ marginTop: '1rem'}}>Look through your matching accounts, which are sorted by the degree of accuracy. Here, you
            can select which columns you'd like to see.</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          container
          xs={7}
          p={0}
          sx={{ width: '100%', color: '#fff' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '6rem', marginRight: '3rem', padding: '4rem', backgroundColor: '#1b5e20' }}>
            <img className='how-to-img' src='/salesdap home page.png' />
          </Paper>
        </Grid>
      </Grid>

      {/* how to section 3 */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        sx={{ height: '95vh'}}
      >
        <Grid
          item
          container
          xs={7}
          p={0}
          sx={{ width: '100%', color: '#fff' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '6rem', marginRight: '3rem', padding: '4rem', backgroundColor: '#003300' }}>
            <img className='how-to-img' src='/salesdap home page.png' />
          </Paper>
        </Grid>
        <Grid
          item
          container
          xs={5}
          p={0}
          sx={{ width: '100%', backgroundColor: '#fff', color: '#fff', }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '4rem', marginRight: '4rem', padding: '1rem'}}>
            <Typography variant="h4" sx={{ textDecoration: 'underline' }}>Contact your partner rep</Typography>
            <Typography variant="body1" sx={{ marginTop: '1rem'}}>Copy and paste our email template into your email service. Download the results as a spreadsheet,
            and attach it to the email, and send it to your partner rep.</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* pricing */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        sx={{ height: '95vh'}}
      >
        <Grid
          item
          container
          xs={4}
          p={0}
          sx={{ width: '100%', backgroundColor: '#fff', color: '#fff', }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '4rem', marginRight: '4rem', padding: '1rem', backgroundColor: '#fffde7'}}>
            <Typography variant="h4" sx={{ textDecoration: 'underline' }}>Trial</Typography>
            <Typography variant="body1" sx={{ marginTop: '1rem'}}>Compare 10 lists, on the house!</Typography>
            <Grid item container direction="row">
              <Typography variant="h2">FREE</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          container
          xs={4}
          p={0}
          sx={{ width: '100%', backgroundColor: '#fff', color: '#fff', }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '4rem', marginRight: '4rem', padding: '1rem'}}>
            <Typography variant="h4" sx={{ textDecoration: 'underline' }}>Premium</Typography>
            <Typography variant="body1" sx={{ marginTop: '1rem'}}>Unlimited account list comparisons, unlimited possibilities.</Typography>
            <Grid item container direction="row">
              <Typography variant="h2">$15</Typography>
              <Typography variant="h5">/month</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          container
          xs={4}
          p={0}
          sx={{ width: '100%', backgroundColor: '#fff', color: '#fff', }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} square sx={{ marginLeft: '4rem', marginRight: '4rem', padding: '1rem', backgroundColor: '#cccab5'}}>
            <Typography variant="h4" sx={{ textDecoration: 'underline' }}>Enterprise</Typography>
            <Typography variant="body1" sx={{ marginTop: '1rem'}}>Contact one of the Salesdap representatives for more info.</Typography>
            <Grid item container direction="row">
              <Typography variant="h2">TBD</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingPage;

{/* <Typography variant='h4'>Step 1: Upload account lists</Typography> */}
          {/* <Paper elevation={1} sx={{
            backgroundColor: '#1b5e20',
            height: '60vh',
            padding: '5rem',
            color: '#fff',
            borderRadius: '20px',
            margin: '3rem 0'
          }}>
            <Typography variant='h6' sx={{ margin: '2rem 0'}}>Upload your list and your partner rep's list.</Typography>
            <img src="/select file.png" alt="select-file-image" width="70%" height="50%" />
          </Paper> */}
          {/* <Paper elevation={1} sx={{
            backgroundColor: '#1b5e20',
            height: '60vh',
            padding: '5rem',
            color: '#fff',
            borderRadius: '20px',
            margin: '3rem 0',
          }}>
            <Typography variant='h6' sx={{ margin: '2rem 0'}}>Select the columns that would be used to find matching values between the lists.</Typography>
            <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Use the search bar to select columns</Typography>
            <img src="/column autocomplete.png" alt="column-autocomplete-image" width="70%" height="10%" />
            <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Or use the data table visualizer to pick columns</Typography>
            <img src="/column grid.png" alt="column-grid-image" width="70%" height="30%" />
          </Paper> */}
        {/* </Grid>
      </Grid>
      <Typography variant='h4' sx={{ margin: '10rem' }}>Step 2: View your results</Typography> */}
      {/* <Paper elevation={1} sx={{ backgroundColor: '#1b5e20', height: '55vh', padding: '5rem', margin: '10rem', color: '#fff' }}>
        <Typography variant='h6' sx={{ margin: '2rem 0'}}>See all the matching values.</Typography>
      </Paper> */}
      // <Typography variant='h4'>Step 3: Contact your partner rep</Typography>
      {/* <Paper elevation={1} sx={{ backgroundColor: '#1b5e20', height: '55vh', padding: '5rem', margin: '10rem', color: '#fff' }}>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Copy and paste our email template</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Download a copy of the results</Typography>
        <Typography variant='subtitle1' sx={{ margin: '2rem 0'}}>Contact your partner rep</Typography>
      </Paper> */}