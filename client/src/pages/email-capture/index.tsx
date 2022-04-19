import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Fab,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';

interface Props {
  onClose: any;
  onSubmit: any;
}

const EmailCapture = ({ onClose, onSubmit }: Props) => {

  const validate = (values: any) => {
    const errors: any = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <Box sx={{ width: '100%', height: '100%', padding: '0 0 3rem 0' }}>
      <AppBar sx={{ position: 'relative', marginBottom: '3rem' }}>
        <Toolbar>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={3}
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
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Join the waitlist for Salesdap</Typography>
            <TextField
              label="email address"
              variant="standard"
              name="email"
              sx={{ width: '100%' }}
              error={touched.email && !!errors.email}
              helperText={errors.email ? errors.email : null}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '2.5rem' }}
              type="submit"
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