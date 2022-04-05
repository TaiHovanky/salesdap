import React, { ChangeEvent, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { AttachFile } from '@mui/icons-material';
import {
  Fab,
  Typography,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Chip,
  TextField
} from '@mui/material';
import { Attachment } from '@mui/icons-material';
import { connect } from 'react-redux';
import {
  validateDocumentTypeFailure,
  setFileSource,
  changeComparisonColumn,
  validateDocumentTypeSuccess,
  selectDocument
} from '../../state/actions/document';
import { UserState } from '../../state/reducers/user';
import { checkIsValidFileType } from '../../utils/validate-file-type';
// import UploadedFileGrid from '../uploaded-file-grid';

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
   * When the user selects a document, validate the file type
   * @param event 
   */
  const validateFileSelection = async (event: any) => {
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    // dispatch(selectDocument(document, index));
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      dispatch(validateDocumentTypeSuccess());
      const data = await document.arrayBuffer();
  /* data is an ArrayBuffer */
      const workbook = XLSX.read(data);
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet | null = workbook && workbook.Sheets ?
        workbook.Sheets[sheetName as any] : null;

      if (worksheet) {
        const wsDataObj: any = XLSX.utils.sheet_to_json(worksheet);
        console.log('ws data obj', wsDataObj);
        dispatch(selectDocument(wsDataObj, index, document.name));
      }
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
            </> :
            <>
              <Typography variant="subtitle1">Pinned File:</Typography>
              <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFile} />
            </>
          }
          <TextField
            required
            id="standard-basic"
            label="Column to find duplicate values in"
            variant="standard"
            sx={{ width: '100%' }}
            onChange={handleComparisonColumnFieldChange}
            value={comparisonColumn}
          />
    </form>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  user: state.user
});

export default connect(mapStateToProps)(UploadDocumentColumn);