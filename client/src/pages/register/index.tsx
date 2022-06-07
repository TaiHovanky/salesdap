import React from 'react';
import {
  Box,
  Fab,
  TextField,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import PaymentButton from '../../components/payment-button';
import Payment from '../payment';

const FREE = 'FREE';
const FREE_DESCRIPTION = 'Free: Sign up now to be able to compare 10 lists';
const PREMIUM = 'PREMIUM';
const PREMIUM_DESCRIPTION = 'Premium: You can compare an unlimited amount of lists per month';
// const ENTERPRISE = 'ENTERPRISE';
// const ENTERPRISE_DESCRIPTION = 'Enterprise: Talk to a Salesdap advisor in order to create an account for your organization';


interface Props {
  onSubmit: any;
  setIsLoading: any;
  createRegistrationUser: any;
}

const Register = ({ onSubmit, setIsLoading, createRegistrationUser }: Props) => {

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
      company: '',
      subscriptionType: FREE
    },
    validate,
    onSubmit
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = formik;

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
            <form style={{ width: '100%' }}>
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
                sx={{ width: '100%', marginBottom: '3rem' }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
              />
              <FormControl sx={{ marginBottom: '2rem' }}>
                <FormLabel sx={{ marginBottom: '1rem' }}>What type of subscription do you want?</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="subscription-radio-buttons-group"
                  value={values.subscriptionType}
                  onChange={(_, value: string) => setFieldValue('subscriptionType', value)}
                >
                  <FormControlLabel
                    value={FREE}
                    control={<Radio checked={values.subscriptionType === FREE} />}
                    label={FREE_DESCRIPTION}
                    name="free"
                  />
                  <FormControlLabel
                    value={PREMIUM}
                    control={<Radio checked={values.subscriptionType === PREMIUM} />}
                    label={PREMIUM_DESCRIPTION}
                    name="premium"
                  />
                  {/* <FormControlLabel value={ENTERPRISE} control={<Radio />} label="Enterprise" /> */}
                </RadioGroup>
              </FormControl>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  container
                  xs={10}
                  p={0}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  {values.subscriptionType === PREMIUM ?
                    <>
                      {/* <PaymentButton
                        disabled={isSubmitButtonDisabled}
                        user={values}
                        handleSubmit={handleSubmit}
                        setIsLoading={setIsLoading}
                      /> */}
                      <Payment createRegistrationUser={createRegistrationUser} registrationUser={values} />
                    </>
                    :
                    <Fab
                      variant="extended"
                      aria-label="add"
                      sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                      type="submit"
                      disabled={isSubmitButtonDisabled}
                    >
                      sign up
                    </Fab>
                  }
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