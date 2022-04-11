import React from 'react';
import axios from 'axios';
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
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { setIsLoading } from '../../state/actions/loading';
import { showError, hideError } from '../../state/actions/alert';

interface EmailCaptureProps {
  onClose: any;
  dispatch: any;
}

const EmailCapture = ({ onClose, dispatch }: EmailCaptureProps) => {

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
    onSubmit: (values: any) => {
      dispatch(setIsLoading(true));
      const formData = new FormData();
      formData.append('email', values.email);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      axios.post('/api/v1/email', formData, config)
        .then(() => {
          dispatch(hideError());
          dispatch(setIsLoading(false));
          onClose();
        })
        .catch((err: any) => {
          console.log('email err', err);
          dispatch(setIsLoading(false));
          dispatch(showError('Waitlist registration failed. Please try again.'))
        });
    }
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

export default connect()(EmailCapture);