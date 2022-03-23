import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Fab,
  TextField,
  CircularProgress,
  Backdrop,
  Grid,
  Typography,
  Alert,
  AlertTitle
} from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/nav-bar';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    axios.post('http://localhost:3001/api/v1/register', formData, config)
      .then((data) => {
        console.log('register', data);
        history.push('/home');
      })
      .catch((err: any) => console.log('err', err));
  }

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
            xs={4}
            p={0}
            sx={{ height: '100%' }}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">Register</Typography>
            <Typography variant="subtitle1">Sign up for Salesdap</Typography>
            <TextField
              required
              id="standard-basic"
              label="Email"
              variant="standard"
              sx={{ width: '100%' }}
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              required
              id="standard-basic"
              label="Password"
              variant="standard"
              sx={{ width: '100%' }}
              value={password}
              onChange={handlePasswordChange}
            />
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '2.5rem' }}
              onClick={handleSubmit}
            >
              Submit
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;