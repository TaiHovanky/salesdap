import React from 'react';
import {
  Box,
  Fab,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

interface Props {
  onSubmit: any;
}

const Register = ({ onSubmit }: Props) => {

  const validate = (values: any) => {
    const errors: any = {};
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
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      company: ''
    },
    validate,
    onSubmit
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const isSubmitButtonDisabled = !!errors.email || !!errors.password || !!errors.confirmPassword
    || !values.email || !values.password || !values.confirmPassword;

  return (
    <>
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
            <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Register</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="standard-basic"
                label="Email"
                name="email"
                variant="standard"
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                error={touched.email && !!errors.email}
                helperText={touched.email && !!errors.email ? errors.email : null}
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
                helperText={touched.password && !!errors.password ? errors.password : null}
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
                helperText={touched.confirmPassword && !!errors.confirmPassword ? errors.confirmPassword : null}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <TextField
                id="standard-basic"
                label="First Name"
                name="firstName"
                variant="standard"
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
              />
              <TextField
                id="standard-basic"
                label="Last Name"
                name="lastName"
                variant="standard"
                sx={{ width: '100%', marginBottom: '1.5rem' }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
              />
              <TextField
                id="standard-basic"
                label="Company"
                name="company"
                variant="standard"
                sx={{ width: '100%' }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
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
            <Typography sx={{ marginTop: '2rem', marginBottom: '3rem' }}>
              Already have an account? <Link className="auth-page-link" to="/">Sign in</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;