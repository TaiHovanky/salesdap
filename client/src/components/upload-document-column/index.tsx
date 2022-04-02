import React, { ChangeEvent, useRef } from 'react';
import axios from 'axios';
import { AttachFile } from '@mui/icons-material';
import {
  Fab,
  TextField,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Chip
} from '@mui/material';
import { Attachment } from '@mui/icons-material';
import { connect } from 'react-redux';
import {
  selectDocument,
  changeComparisonColumn,
  changeResultColumns,
  validateDocumentTypeSuccess,
  validateDocumentTypeFailure,
  pinFile,
  pinFileFailure,
  pinFileSuccess,
  setFileSource
} from '../../state/actions/document';
import { UserState } from '../../state/reducers/user';
import { checkIsValidFileType } from '../../utils/validate-file-type';

interface UploadDocumentColumnProps {
  dispatch: any;
  selectedDocument: any;
  comparisonColumn: string;
  resultColumns: string;
  isFilePinned: boolean;
  fileSource: string;
  index: number;
  user: UserState;
  otherColumnUsingPinned: boolean;
}

const UploadDocumentColumn = ({
  dispatch,
  selectedDocument,
  comparisonColumn,
  resultColumns,
  isFilePinned,
  fileSource,
  index,
  user,
  otherColumnUsingPinned
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

  const handleFilePinning = () => {
    if (index === 0) {
      dispatch(pinFile(index));
      const formData = new FormData();
      if (
        selectedDocument &&
        selectedDocument.name
      ) {
        formData.append(
          'sales_file',
          selectedDocument,
          selectedDocument.name
        );
        formData.append(
          'email',
          user.email
        );
      }
      axios.post('http://localhost:3001/api/v1/pinfile', formData)
        .then((data) => {
          pinFileSuccess(selectedDocument.name);
        })
        .catch((err) => {
          console.log(err);
          pinFileFailure();
        });
    }
  }

  const handleFileTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFileSource(index, event.target.value));
  }

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
        console.log('data viewing');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', user.pinnedFile);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log('err pinned file', err));
  };

  console.log('other col', otherColumnUsingPinned, index);
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
          {!!user.pinnedFile && !otherColumnUsingPinned && <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={fileSource}
              onChange={handleFileTypeChange}
              sx={{ marginBottom: '2rem' }}
            >
              <FormControlLabel value="upload" control={<Radio />} label="Upload a file" />
              <FormControlLabel value="pinned" control={<Radio />} label="Use your pinned file" />
            </RadioGroup>
          </FormControl>}
          {fileSource === 'upload' ?
            <>
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
              <FormControlLabel
                control={
                  <Switch checked={isFilePinned} onChange={handleFilePinning} name="pinFile" />
                }
                label="Pin file for later use?"
                sx={{ marginTop: '1.5rem' }}
              />
            </> :
            <>
              <Typography variant="subtitle1">Pinned File:</Typography>
              <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFile} />
            </>
          }
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  user: state.user
});

export default connect(mapStateToProps)(UploadDocumentColumn);