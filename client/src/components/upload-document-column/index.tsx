import React, { ChangeEvent, useRef } from 'react';
import { AttachFile } from '@mui/icons-material';
import {
  Fab,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import { connect } from 'react-redux';
import {
  selectDocument,
  changeComparisonColumn,
  changeResultColumns,
  validateDocumentTypeSuccess,
  validateDocumentTypeFailure
} from '../../state/actions/document';
import { checkIsValidFileType } from '../../utils/validate-file-type';

interface UploadDocumentColumnProps {
  dispatch: any;
  selectedDocument: any;
  comparisonColumn: string;
  resultColumns: string;
  index: number;
}

const UploadDocumentColumn = ({
  dispatch,
  selectedDocument,
  comparisonColumn,
  resultColumns,
  index
}: UploadDocumentColumnProps) => {
  const inputFileRef: any = useRef( null );

  /**
   * As the user types in the Column field, update its value
   * @param event
   */
  const handleComparisonColumnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeComparisonColumn(event.target.value, index));
  };

  /**
   * As the user types in the Column field, update its value
   * @param event
   */
   const handleResultColumnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeResultColumns(event.target.value, index));
  };

  /**
   * When the user selects a document, validate the file type
   * @param event 
   */
  const validateFileSelection = (event: any) => {
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    dispatch(selectDocument(document, index));
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      dispatch(validateDocumentTypeSuccess());
    } else {
      dispatch(validateDocumentTypeFailure());
    }
  };

  /**
   * Triggers the clicking of the hidden input (type=file) button
   */
  const handleFileSelectionBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef&& inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  return (
    <form>
      <TextField
        required
        id="standard-basic"
        label="Column to find duplicate values in"
        variant="standard"
        sx={{ width: '100%' }}
        onChange={handleComparisonColumnFieldChange}
        value={comparisonColumn}
      />
      <TextField
        required
        id="standard-basic"
        label="Columns that you want to see in results table"
        helperText="Separate values with a comma"
        variant="standard"
        sx={{ width: '100%', marginTop: '2rem' }}
        onChange={handleResultColumnFieldChange}
        value={resultColumns}
      />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: '80%' }}
      >
        <Grid
          item
          container
          xs={6}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
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
            onChange={validateFileSelection}
            name="sales_file"
          />
          {selectedDocument && selectedDocument.name &&
            <Typography variant="subtitle1" sx={{ margin: '1rem 0 0' }}>
              {selectedDocument.name}
            </Typography>
          }
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
});

export default connect(mapStateToProps)(UploadDocumentColumn);