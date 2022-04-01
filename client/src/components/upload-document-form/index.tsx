import * as React from 'react';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Fab
} from '@mui/material';
import axios from 'axios';
import { Upload } from '@mui/icons-material';
import { connect } from 'react-redux';
import UploadDocumentColumn from '../upload-document-column';
import {
  uploadDocument,
  uploadDocumentSuccess,
  uploadDocumentFailure,
} from '../../state/actions/document';
import { changeStep } from '../../state/actions/step-progress';

interface UploadDocumentFormProps {
  dispatch: any;
  loading: boolean;
  activeStep: number;
  selectedDocument1: any;
  selectedDocument2: any;
  comparisonColumn1: string;
  comparisonColumn2: string;
  resultColumns1: string;
  resultColumns2: string;
  errorMessage: string;
  hasError: boolean;
}

const UploadDocumentForm = ({
  dispatch,
  loading,
  activeStep,
  selectedDocument1,
  selectedDocument2,
  comparisonColumn1,
  comparisonColumn2,
  resultColumns1,
  resultColumns2,
  errorMessage,
  hasError,
}: UploadDocumentFormProps) => {

  /**
   * Puts the selected file and column name into a FormData instance,
   * sends it to the server, and then changes to the next step where
   * the duplicates will be displayed
   */
  const handleUpload = () => {
    const formData = new FormData();
    if (
      selectedDocument1 &&
      selectedDocument1.name &&
      selectedDocument2 &&
      selectedDocument2.name
    ) {
      formData.append(
        "sales_file1",
        selectedDocument1,
        selectedDocument1.name
      );
      formData.append(
        "sales_file2",
        selectedDocument2,
        selectedDocument2.name
      );
      formData.append('comparisonColumn1', comparisonColumn1);
      formData.append('comparisonColumn2', comparisonColumn2);
      formData.append('resultColumns1', resultColumns1);
      formData.append('resultColumns2', resultColumns2);

      dispatch(uploadDocument());
      axios.post('http://localhost:3001/api/v1/uploadfile', formData)
        .then((res) => {
          dispatch(uploadDocumentSuccess(res.data));
          dispatch(changeStep(activeStep += 1));
        })
        .catch((err: any) => dispatch(uploadDocumentFailure(err.message)));
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
        sx={{ height: '80%' }}
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
          <UploadDocumentColumn
            comparisonColumn={comparisonColumn1}
            index={0}
            resultColumns={resultColumns1}
            selectedDocument={selectedDocument1}
          />
        </Grid>
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
          <UploadDocumentColumn
            comparisonColumn={comparisonColumn2}
            index={1}
            resultColumns={resultColumns2}
            selectedDocument={selectedDocument2}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid
          item
          container
          xs={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            sx={{ marginTop: '2rem' }}
            onClick={handleUpload}
          >
            <Upload sx={{ mr: 1 }} />
            Upload and Compare
          </Fab>
        </Grid>
      </Grid>

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
};

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  selectedDocument1: state.document.selectedDocument1,
  selectedDocument2: state.document.selectedDocument2,
  comparisonColumn1: state.document.comparisonColumn1,
  comparisonColumn2: state.document.comparisonColumn2,
  resultColumns1: state.document.resultColumns1,
  resultColumns2: state.document.resultColumns2,
  errorMessage: state.document.errorMessage,
  hasError: state.document.hasError,
  loading: state.document.loading,
});

export default connect(mapStateToProps)(UploadDocumentForm);