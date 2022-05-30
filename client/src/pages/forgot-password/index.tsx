import React from 'react';
import {
  Box,
  Fab,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

interface Props {
  onSubmit: any;
}

const ForgotPassword = ({ onSubmit }: Props) => {
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
    onSubmit
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const isSubmitButtonDisabled = !!errors.email || !values.email;

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
            <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Forgot my password</Typography>
            <Typography variant="subtitle1" sx={{ marginBottom: '1.5rem', width: '80%' }}>
              Enter your email, and then you'll receive a verification code at that address. Use that code to reset your password.
            </Typography>
            <form onSubmit={handleSubmit}  style={{ width: '100%' }}>
              <TextField
                required
                id="standard-basic"
                label="Email"
                name="email"
                variant="standard"
                sx={{ width: '100%' }}
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
                    sx={{ margin: '2.5rem auto 3rem auto' }}
                    type="submit"
                    disabled={isSubmitButtonDisabled}
                  >
                    Send Password Reset Email
                  </Fab>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPassword;