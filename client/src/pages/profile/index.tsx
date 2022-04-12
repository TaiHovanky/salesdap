import React, { useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Fab,
} from '@mui/material';
import { Attachment, Upload } from '@mui/icons-material';
import { connect } from 'react-redux';
import {
  pinFileSuccess,
} from '../../state/actions/document';
import NavBar from '../../components/nav-bar';
import { UserState } from '../../state/reducers/user';
import { checkIsValidFileType } from '../../utils/validate-file-type';
import {
  createFileLink,
  getPinnedFile
} from '../../utils/spreadsheet.utils';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface Props {
  user: UserState;
  dispatch: any;
}

const Profile = ({ user, dispatch }: Props) => {
  const inputFileRef: any = useRef(null);

  const handlePinnedFileClick = async () => {
    try {
      dispatch(setIsLoading(true));
      const pinnedFileData = await getPinnedFile(user.pinnedFile);
      dispatch(setIsLoading(false));
      createFileLink(pinnedFileData.data, user.pinnedFile);
    } catch (err: any) {
      console.log('err', err);
      dispatch(setIsLoading(false));
      dispatch(showError(`Failed to download pinned file. ${err}`));
    }
  };

  const handleFileSelectionBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef&& inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  const validateFileSelection = (event: any) => {
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      dispatch(hideError());
      handleFilePinning(document);
    } else {
      dispatch(showError('Invalid file type. Only pin .xls, .xlsx, or .csv'));
    }
  };

  const handleFilePinning = (file: any) => {
    dispatch(setIsLoading(true));
    const formData = new FormData();
    if (
      file &&
      file.name
    ) {
      formData.append(
        'sales_file',
        file,
        file.name
      );
      formData.append(
        'email',
        user.email
      );
    }
    axios.post('/api/v1/pinfile', formData)
      .then(() => {
        dispatch(pinFileSuccess(file.name));
        dispatch(hideError());
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
        dispatch(showError(`Failed to pin file. ${err}`));
      });
  }

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
            xs={8}
            p={0}
            sx={{ height: '100%' }}
            direction="column"
            justifyContent="start"
            alignItems="center"
          >
            <Paper elevation={3} sx={{ width: '100%', padding: '3rem 0 3rem 3rem', marginTop: '3rem' }}>
              <Typography variant="h5" sx={{ marginBottom: '2rem' }}>Profile</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Name: {user.firstname} {user.lastname}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Email: {user.email}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '2rem' }}>Company: {user.company}</Typography>
              <Typography variant="subtitle1">Pinned File:</Typography>
              <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFile} />
              <Grid
                item
                container
                xs={6}
                p={0}
                direction="column"
                justifyContent="start"
                alignItems="start"
              >
                <Fab
                  variant="extended"
                  aria-label="add"
                  sx={{ marginTop: '2.5rem' }}
                  onClick={handleFileSelectionBtnClick}
                >
                  <Upload sx={{ mr: 1 }} />
                  Select New Pinned File
                </Fab>
                <input
                  type="file"
                  ref={inputFileRef}
                  className="file-input"
                  onChange={validateFileSelection}
                  name="sales_file"
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);