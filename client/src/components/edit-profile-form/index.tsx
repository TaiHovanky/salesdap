import React from 'react';
import {
  TextField,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState;
  onSubmit: any;
}

const EditProfileForm = ({
  user,
  onSubmit
}: Props) => {

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      company: user.company,
    },
    validate,
    onSubmit,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <form style={{ width: '90%' }} onSubmit={(vals: any) => {
      return handleSubmit(vals);
    }}>
      <TextField
        id="standard-basic"
        label="First Name"
        name="firstName"
        variant="standard"
        sx={{ width: '100%', marginBottom: '1.5rem' }}
        onChange={handleChange}
        value={values.firstName}
      />
      <TextField
        id="standard-basic"
        label="Last Name"
        name="lastName"
        variant="standard"
        sx={{ width: '100%', marginBottom: '1.5rem' }}
        onChange={handleChange}
        value={values.lastName}
      />
      <TextField
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
        id="standard-basic"
        label="Company"
        name="company"
        variant="standard"
        sx={{ width: '100%', marginBottom: '1.5rem' }}
        onChange={handleChange}
        value={values.company}
      />
      <Button type="submit" variant="contained" sx={{ marginBottom: '2.5rem' }}>Save Changes</Button>
    </form>
  );
}

export default EditProfileForm;