import React, { ChangeEvent, useRef } from 'react';
import axios from 'axios';
import { AttachFile } from '@mui/icons-material';
import {
  Fab,
  Typography,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Chip
} from '@mui/material';
import { Attachment } from '@mui/icons-material';
import { connect } from 'react-redux';
import {
  validateDocumentTypeFailure,
  setFileSource
} from '../../state/actions/document';
import { UserState } from '../../state/reducers/user';
import { checkIsValidFileType } from '../../utils/validate-file-type';
import UploadedFileGrid from '../uploaded-file-grid';

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
   * When the user selects a document, validate the file type
   * @param event 
   */
  const validateFileSelection = (event: any) => {
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    // dispatch(selectDocument(document, index));
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      // dispatch(validateDocumentTypeSuccess());
      const formData = new FormData();
      formData.append(
        `sales_file${index + 1}`,
        selectedDocument,
        selectedDocument.name
      );
      axios.post('http://localhost:3001/api/v1/uploadfile', formData)
        .then((res) => {
          dispatch(uploadDocumentSuccess(res.data));
        })
        .catch((err: any) => dispatch(uploadDocumentFailure(err.message)));
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

  return (
    <form style={{ width: '100%' }}>
      {/* <Grid
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
        > */}
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
                sx={{ marginTop: '2.5rem', marginBottom: '3rem' }}
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
              <UploadedFileGrid />
            </> :
            <>
              <Typography variant="subtitle1">Pinned File:</Typography>
              <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFile} />
            </>
          }
        {/* </Grid>
      </Grid> */}
    </form>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  user: state.user
});

export default connect(mapStateToProps)(UploadDocumentColumn);