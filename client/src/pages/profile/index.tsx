import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Fab,
  Alert,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { Attachment, AttachFile, Upload } from '@mui/icons-material';
import { connect } from 'react-redux';
import {
  pinFileSuccess,
} from '../../state/actions/document';
import NavBar from '../../components/nav-bar';
import { UserState } from '../../state/reducers/user';
import { checkIsValidFileType } from '../../utils/validate-file-type';

interface Props {
  user: UserState;
  dispatch: any;
}

const Profile = ({ user, dispatch }: Props) => {
  const [pinnedDocument, setPinnedDocument] = useState<any>();
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputFileRef: any = useRef( null );

  const handlePinnedFileClick = () => {
    axios.get('http://localhost:3001/api/v1/viewpinnedfile',
      {
        responseType: 'blob',
        params: {
          filename: user.pinnedFile
        }
      }
    )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', user.pinnedFile);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log('err pinned file', err));
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
    setPinnedDocument(document);
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const handleFilePinning = () => {
    setLoading(true);
    const formData = new FormData();
    if (
      pinnedDocument &&
      pinnedDocument.name
    ) {
      formData.append(
        'sales_file',
        pinnedDocument,
        pinnedDocument.name
      );
      formData.append(
        'email',
        user.email
      );
    }
    axios.post('http://localhost:3001/api/v1/pinfile', formData)
      .then((data) => {
        setLoading(false);
        dispatch(pinFileSuccess(pinnedDocument.name));
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorMessage(err);
        setHasError(true);
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
                  <AttachFile sx={{ mr: 1 }} />
                  Select New Pinned File
                </Fab>
                <input
                  type="file"
                  ref={inputFileRef}
                  className="file-input"
                  onChange={validateFileSelection}
                  name="sales_file"
                />
                {pinnedDocument && pinnedDocument.name &&
                  <Typography variant="subtitle1" sx={{ margin: '1rem 0 0' }}>
                    {pinnedDocument.name}
                  </Typography>
                }
                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="add"
                  sx={{ marginTop: '2rem' }}
                  onClick={handleFilePinning}
                >
                  <Upload sx={{ mr: 1 }} />
                  Upload and Pin File
                </Fab>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {hasError &&
        <Alert
          severity="error"
          variant="standard"
          sx={{ marginTop: '2rem', borderRadius: '10px', width: '100%' }}
        >
          {errorMessage}
        </Alert>
      }

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);