import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Fab,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { Attachment, Upload, Payment as PaymentIcon, Edit } from '@mui/icons-material';
import { useFormik } from 'formik';
import { UserState } from '../../state/reducers/user';
import InfoTooltip from '../../components/info-tooltip';

interface Props {
  user: UserState;
  validateFileSelection: any;
  handlePinnedFileClick: any;
  handleManageSubscriptionClick: any;
  handleCreateCheckoutSession: any;
  onSubmit: any;
}

const Profile = ({
  user,
  validateFileSelection,
  handlePinnedFileClick,
  handleManageSubscriptionClick,
  handleCreateCheckoutSession,
  onSubmit
}: Props) => {
  const inputFileRef: any = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };

  console.log('user in prof', user);
  const formik = useFormik({
    initialValues: {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      company: user.company,
    },
    validate,
    onSubmit
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const handleFileSelectionBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef&& inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  }

  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    if (user && user.activeSubscription === true) {
      setHasActiveSubscription(true);
    }
  }, [user])

  return (
    <>
      <Box sx={{ width: '100%', marginTop: '3.5vh' }}>
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
            xs={8}
            p={0}
            sx={{ height: '100%' }}
            direction="column"
            justifyContent="start"
            alignItems="center"
          >
            <Paper elevation={3} sx={{ width: '100%', padding: '3rem 0 3rem 3rem', margin: '3rem auto 3rem auto' }}>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Profile <IconButton onClick={handleEditButtonClick}><Edit /></IconButton></Typography>
              {isEditing ?
                <form style={{ width: '90%' }} onSubmit={(vals: any) => {
                  setIsEditing(false);
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
                </form> :
                <>
                  <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Name: {user.firstname} {user.lastname}</Typography>
                  <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Email: {user.email}</Typography>
                  <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Company: {user.company}</Typography>
                </>
              }
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Subscription Type: {user.subscriptionType}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Paid Subscription: {user.activeSubscription ? 'Yes' : 'No'}</Typography>
              <Typography variant="subtitle1">Pinned File:</Typography>
              <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFileName} />
              <Grid
                item
                container
                xs={6}
                p={0}
                direction="column"
                justifyContent="start"
                alignItems="start"
              >
                <InfoTooltip
                  arrow
                  placement="top-start"
                  open={!user.pinnedFileId}
                  title="Upload and 'pin' a list that you will regularly be comparing to partner account lists"
                >
                  <Fab
                    variant="extended"
                    aria-label="add"
                    sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                    onClick={handleFileSelectionBtnClick}
                  >
                    <Upload sx={{ mr: 1 }} />
                    Select Pinned File
                  </Fab>
                </InfoTooltip>
                <input
                  type="file"
                  ref={inputFileRef}
                  className="file-input"
                  onChange={validateFileSelection}
                  name="sales_file"
                />
                {hasActiveSubscription ?
                  <Fab
                    variant="extended"
                    aria-label="add"
                    sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                    onClick={handleManageSubscriptionClick}
                  >
                    <PaymentIcon sx={{ mr: 1 }} />
                    Manage Subscription
                  </Fab> :
                  <Fab
                    variant="extended"
                    aria-label="add"
                    sx={{ marginTop: '2.5rem', minWidth: '208px' }}
                    onClick={() => handleCreateCheckoutSession(user.email)}
                  >
                    <PaymentIcon sx={{ mr: 1 }} />
                    Upgrade Subscription
                  </Fab>
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;