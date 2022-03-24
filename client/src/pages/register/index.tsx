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
import { useHistory, Link } from 'react-router-dom';
import NavBar from '../../components/nav-bar';
import { FormField, useFormField } from '../../hooks';

const Register = () => {
  const email: FormField = useFormField('', 'email');
  const password: FormField = useFormField('', 'password');
  const confirmPassword: FormField = useFormField('', 'password');
  const history = useHistory();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);
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
              name="email"
              variant="standard"
              sx={{ width: '100%' }}
              {...email}
            />
            <TextField
              required
              id="standard-basic"
              label="Password"
              name="password"
              variant="standard"
              type="password"
              sx={{ width: '100%' }}
              {...password}
            />
            <TextField
              required
              id="standard-basic"
              label="Confirm Password"
              name="confirm-password"
              variant="standard"
              type="password"
              sx={{ width: '100%' }}
              value={confirmPassword.value}
              error={confirmPassword.error}
              onChange={(event) => { confirmPassword.onChange(event, password.value)}}
            />
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '2.5rem' }}
              onClick={handleSubmit}
            >
              Submit
            </Fab>
            <Typography sx={{ marginTop: '2rem' }}>
              Alread have an account? <Link to="/">Sign in</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;