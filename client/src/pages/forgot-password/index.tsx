import React, { useState } from 'react';
import {
  Box,
  Fab,
  TextField,
  CircularProgress,
  Backdrop,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import NavBar from '../../components/nav-bar';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  const validate = (values: any) => {
    const errors: any = {};
  
    if (!values.email) {
      errors.email = 'Required';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (values: any) => {
      const formData = new FormData();
      formData.append('email', values.email);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      setLoading(true);
      axios.post('http://localhost:3001/api/v1/forgotpassword', formData, config)
        .then(() => {
          setLoading(false);
          setForgotPasswordError('');
        })
        .catch((err: any) => {
          console.log('err', err);
          setLoading(false);
          setForgotPasswordError('Wrong email or password');
        });
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const isSubmitButtonDisabled = !!errors.email || !values.email;

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
            <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>Forgot my password</Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>
              Enter your email, and then you'll receive a verification code at that address. Use that code to reset your password.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="standard-basic"
                label="Email"
                name="email"
                variant="standard"
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                error={touched.email && !!errors.email}
                helperText={errors.email ? errors.email : null}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  container
                  xs={12}
                  p={0}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Fab
                    variant="extended"
                    aria-label="add"
                    sx={{ marginTop: '2.5rem', marginLeft: 'auto', marginRight: 'auto' }}
                    type="submit"
                    disabled={isSubmitButtonDisabled}
                  >
                    Send Password Reset Email
                  </Fab>
                </Grid>
              </Grid>
            </form>

            {!!forgotPasswordError &&
              <Alert
                severity="error"
                variant="standard"
                sx={{ marginTop: '2rem', borderRadius: '10px', width: '100%' }}
              >
                {forgotPasswordError}
              </Alert>
            }
          </Grid>
        </Grid>
      </Box>

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ForgotPassword;