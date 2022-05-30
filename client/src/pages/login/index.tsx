import React, { useState } from 'react';
import EmailCaptureContainer from '../../containers/email-capture';
import {
  Box,
  Fab,
  TextField,
  Grid,
  Typography,
  Dialog
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

interface Props {
  onSubmit: any;
}

const Login = ({ onSubmit }: Props) => {
  const [isEmailCaptureModalOpen, setIsEmailCaptureModalOpen] = useState(true);

  const handleClose = (event: any) => {
    setIsEmailCaptureModalOpen(false);
  }

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = 'Required';
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
      password: ''
    },
    validate,
    onSubmit
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const isSubmitButtonDisabled = !!errors.email || !!errors.password ||
    !values.email || !values.password;

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
            <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Login</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                sx={{ width: '100%' }}
                error={touched.password && !!errors.password}
                helperText={touched.password && !!errors.password ? errors.password : null}
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
                  xs={6}
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
              Don't have an account?  <Link className="auth-page-link" to="/register">Sign up now!</Link>
            </Typography>
            <Typography sx={{ marginTop: '0.5rem', marginBottom: '3rem' }}>
              Forgot your password?  <Link className="auth-page-link" to="/forgot-password">Reset your password</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={isEmailCaptureModalOpen} onClose={handleClose}>
        <EmailCaptureContainer onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default Login;