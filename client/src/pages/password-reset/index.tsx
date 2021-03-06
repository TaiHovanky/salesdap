import React, { useState, useEffect } from 'react';
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
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import NavBar from '../../components/nav-bar';

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState('');
  const history = useHistory();
  const params: any = useParams();

  useEffect(() => {
    axios.post('/api/v1/resetpassword', { token: params.token })
      .catch((err) => {
        history.push('/login');
      });
  }, [params, history]);

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }
  
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Must match password';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values: any) => {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      setLoading(true);
      axios.post('/api/v1/updatepassword', formData, config)
        .then((res) => {
          setLoading(false);
          setPasswordResetError('');
          history.push('/login');
        })
        .catch((err: any) => {
          setLoading(false);
          setPasswordResetError('Password reset failed. Please try again.')
        });
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const isSubmitButtonDisabled = !!errors.email || !!errors.password || !!errors.confirmPassword
    || !values.email || !values.password || !values.confirmPassword;

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
            <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Reset your password</Typography>
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
              <TextField
                required
                id="standard-basic"
                label="Password"
                name="password"
                variant="standard"
                type="password"
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                error={touched.password && !!errors.password}
                helperText={errors.password ? errors.password : null}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              <TextField
                required
                id="standard-basic"
                label="Confirm Password"
                name="confirmPassword"
                variant="standard"
                type="password"
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword : null}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
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
                  xs={8}
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
                    Reset Password
                  </Fab>

                  {!!passwordResetError &&
                    <Alert
                      severity="error"
                      variant="standard"
                      sx={{ marginTop: '2rem', borderRadius: '10px', width: '100%' }}
                    >
                      {passwordResetError}
                    </Alert>
                  }
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PasswordReset;