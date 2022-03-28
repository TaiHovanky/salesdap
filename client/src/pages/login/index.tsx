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
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import NavBar from '../../components/nav-bar';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = 'Required';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
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
      axios.post('http://localhost:3001/api/v1/login', formData, config)
        .then((data) => {
          setLoading(false);
          console.log('data', data)
          history.push('/home');
        })
        .catch((err: any) => {
          console.log('err', err);
          setLoading(false);
          setLoginError('Wrong email or password');
        });
    },
  });

  const history = useHistory();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const isSubmitButtonDisabled = !!errors.email || !!errors.password ||
    !values.email || !values.password;

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
            <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Login</Typography>
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
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  container
                  xs={4}
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
                    Submit
                  </Fab>
                </Grid>
              </Grid>
            </form>
            <Typography sx={{ marginTop: '2rem' }}>
              Don't have an account?  <Link to="/">Sign up</Link>
            </Typography>

            {!!loginError &&
              <Alert
                severity="error"
                variant="standard"
                sx={{ marginTop: '2rem', borderRadius: '10px', width: '100%' }}
              >
                {loginError}
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

export default Login;