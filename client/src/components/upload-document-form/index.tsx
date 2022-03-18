import React, { ChangeEvent, useRef } from 'react';
import axios from 'axios';
import { Upload, AttachFile } from '@mui/icons-material';
import {
  Fab,
  TextField,
  CircularProgress,
  Backdrop,
  Grid,
  Typography,
  Alert,
  AlertTitle
} from '@mui/material';
import { connect } from 'react-redux';
import {
  uploadDocument,
  uploadDocumentSuccess,
  uploadDocumentFailure,
  selectDocument,
  changeColumn,
  validateDocumentTypeSuccess,
  validateDocumentTypeFailure
} from '../../state/actions/document';
import { changeStep } from '../../state/actions/step-progress';
import { checkIsValidFileType } from '../../utils/validate-file-type';

interface UploadDocumentFormProps {
  dispatch: any;
  loading: boolean;
  activeStep: number;
  column: string;
  selectedDocument: any;
  errorMessage: string;
  hasError: boolean;
}

const UploadDocumentForm = ({
  dispatch,
  loading,
  activeStep,
  selectedDocument,
  column,
  errorMessage,
  hasError
}: UploadDocumentFormProps) => {
  const inputFileRef: any = useRef( null );

  /**
   * As the user types in the Column field, update its value
   * @param event
   */
  const handleColumnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeColumn(event.target.value));
  };

  /**
   * When the user selects a document, validate the file type
   * @param event 
   */
  const handleFileSelection = (event: any) => {
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    dispatch(selectDocument(document));
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      dispatch(validateDocumentTypeSuccess());
    } else {
      dispatch(validateDocumentTypeFailure());
    }
  };

  /**
   * Puts the selected file and column name into a FormData instance,
   * sends it to the server, and then changes to the next step where
   * the duplicates will be displayed
   */
  const handleUpload = () => {
    const formData = new FormData();
    if (selectedDocument && selectedDocument.name) {
      formData.append(
        "sales_file",
        selectedDocument,
        selectedDocument.name
      );
      formData.append('columnName', column);

      dispatch(uploadDocument());
      axios.post('http://localhost:3001/api/v1/uploadfile', formData)
        .then((res) => {
          dispatch(uploadDocumentSuccess(res.data));
          dispatch(changeStep(activeStep += 1));
        })
        .catch((err: any) => dispatch(uploadDocumentFailure(err.message)));
    }
  };

  /**
   * Triggers the clicking of the hidden input (type=file) button
   */
  const handleFileSelectionBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  return (
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
        xs={4}
        p={0}
        sx={{ height: '100%' }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          required
          id="standard-basic"
          label="Column to find ducplicate values in"
          variant="standard"
          sx={{ width: '100%' }}
          onChange={handleColumnFieldChange}
          value={column}
        />
        <Fab
          variant="extended"
          aria-label="add"
          sx={{ marginTop: '2.5rem' }}
          onClick={handleFileSelectionBtnClick}
        >
          <AttachFile sx={{ mr: 1 }} />
          Select File
        </Fab>
        <input
          type="file"
          ref={inputFileRef}
          className="file-input"
          onChange={handleFileSelection}
          name="sales_file"
        />
        {selectedDocument && selectedDocument.name &&
          <Typography variant="subtitle1" sx={{ margin: '1rem 0 0' }}>
            {selectedDocument.name}
          </Typography>
        }
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          sx={{ marginTop: '2rem' }}
          onClick={handleUpload}
        >
          <Upload sx={{ mr: 1 }} />
          Upload
        </Fab>
        {hasError &&
          <Alert
            severity="error"
            variant="standard"
            sx={{ marginTop: '2rem', borderRadius: '10px', width: '100%' }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        }
      </Grid>

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  column: state.document.column,
  errorMessage: state.document.errorMessage,
  hasError: state.document.hasError,
  loading: state.document.loading,
  selectedDocument: state.document.selectedDocument
});

export default connect(mapStateToProps)(UploadDocumentForm);