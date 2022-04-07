import React, { ChangeEvent, useRef } from 'react';
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
  selectDocument,
  setIsLoading
} from '../../state/actions/document';
import { UserState } from '../../state/reducers/user';
import { checkIsValidFileType } from '../../utils/validate-file-type';
import {
  createJSONFromSpreadsheet,
  createFileLink,
  getPinnedFile
} from '../../utils/spreadsheet.utils';

interface UploadDocumentColumnProps {
  dispatch: any;
  selectedDocument: any;
  comparisonColumn: string;
  fileSource: string;
  index: number;
  user: UserState;
}

const UploadDocumentColumn = ({
  dispatch,
  selectedDocument,
  comparisonColumn,
  fileSource,
  index,
  user
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
    dispatch(setIsLoading(true));
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      dispatch(validateDocumentTypeSuccess());
      const wsDataObj: Array<any> = await createJSONFromSpreadsheet(document);
      dispatch(selectDocument(wsDataObj, index, document.name));
      dispatch(setIsLoading(false));
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

  const handleFileTypeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFileSource(index, event.target.value));
    if (event.target.value === 'pinned') {
      dispatch(setIsLoading(true));
      try {
        const pinnedFileBlob = await getPinnedFile(user.pinnedFile);
        const wsDataObj: Array<any> = await createJSONFromSpreadsheet(pinnedFileBlob.data);
        dispatch(selectDocument(wsDataObj, index, user.pinnedFile));
        dispatch(setIsLoading(false));
      } catch (err: any) {
        console.log('err', err);
        dispatch(setIsLoading(false));
      }
    } else {
      dispatch(selectDocument([], index, ''));
    }
  }

  const handlePinnedFileClick = async () => {
    try {
      const pinnedFileData = await getPinnedFile(user.pinnedFile);
      createFileLink(pinnedFileData.data, user.pinnedFile);
    } catch (err: any) {
      console.log('err', err);
    }
  };

  return (
    <form style={{ width: '100%', marginTop: '1.5rem' }}>
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
          <div style={{ height: '100px' }}>
            {!!user.pinnedFile && index === 0 && <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={fileSource}
                onChange={handleFileTypeChange}
                sx={{ marginBottom: '1rem' }}
              >
                <FormControlLabel value="upload" control={<Radio />} label="Upload a file" />
                <FormControlLabel value="pinned" control={<Radio />} label="Use your pinned file" />
              </RadioGroup>
            </FormControl>}
          </div>
          {fileSource === 'upload' ?
            <div style={{ height: '80px' }}>
              <Fab
                variant="extended"
                aria-label="add"
                sx={{ margin: '0 auto' }}
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
              <div style={{ height: '2rem', marginTop: '1rem' }}>
                {selectedDocument && selectedDocument.name &&
                  <Typography variant="subtitle1">
                    {selectedDocument.name}
                  </Typography>
                }
              </div>
            </div> :
            <div style={{ height: '80px' }}>
              <Typography variant="subtitle1">Pinned File:</Typography>
              <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFile} />
            </div>
          }
          <TextField
            required
            id="standard-basic"
            label="Column to find duplicate values in"
            variant="standard"
            sx={{ width: '100%', margin: '1.5rem 0' }}
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