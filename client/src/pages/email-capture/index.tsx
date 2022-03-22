import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Fab
} from '@mui/material';

interface EmailCaptureProps {
  onClose: any;
}

const EmailCapture = ({ onClose }: EmailCaptureProps) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    onClose();
    axios.post('http://localhost:3001/api/v1/email', formData, config)
      .catch((err: any) => console.log('email err', err));
  }

  return (
    <Box sx={{ width: '100%', height: '80vh', marginTop: '3.5vh' }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100%', width: '100%' }}
      >
        <Grid
          item
          container
          xs={10}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form>
            <Typography variant="h5">Get on the waitlist for Salesdap</Typography>
            <TextField
              label="email address"
              variant="standard"
              sx={{ width: '100%' }}
              value={email}
              onChange={handleEmailChange}
            />
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '2.5rem' }}
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </Fab>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmailCapture;