import React, { SyntheticEvent, useRef } from 'react';
import { AttachFile } from '@mui/icons-material';
import {
  Fab,
  Typography,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Chip,
  TextField,
  Autocomplete,
  Grid
} from '@mui/material';
import { Attachment } from '@mui/icons-material';
import { connect } from 'react-redux';
import {
  setFileSource,
  changeComparisonColumn,
  selectDocument,
  setIsLoading
} from '../../state/actions/document';
import {
  showError, hideError
} from '../../state/actions/alert';
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
  comparisonColumn: Array<string>;
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
  const handleComparisonColumnFieldChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: Array<string>
  ) => {
    dispatch(changeComparisonColumn(newValue, index));
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
      dispatch(hideError());
      const wsDataObj: Array<any> = await createJSONFromSpreadsheet(document);
      dispatch(selectDocument(wsDataObj, index, document.name));
      dispatch(setIsLoading(false));
    } else {
      dispatch(showError('Invalid file type. Only .xls, .xlsx, or .csv files can be processed.'));
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

  const handleFileTypeChange = async (event: any) => {
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

  const autocompleteOptions: Array<string> = selectedDocument && selectedDocument.data && selectedDocument.data[0] ?
    Array.from(Object.keys(selectedDocument.data[0])) :
    [];

  return (
    <>
      <Grid
        item
        container
        xs={4}
        p={0}
        sx={{ height: '100%' }}
        direction="column"
        justifyContent="start"
        alignItems="center"
      >
        <Typography variant='h6' sx={{ marginTop: '2rem' }}>
          {index === 0 ? 'My accounts' : 'Customer\'s accounts'}
        </Typography>
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
        <Autocomplete
          multiple={true}
          options={autocompleteOptions}
          onChange={handleComparisonColumnFieldChange}
          value={comparisonColumn}
          sx={{ width: '100%', margin: '1.5rem 0' }}
          renderInput={(params) => (<TextField
            {...params}
            variant="standard"
            helperText={`Columns from file ${index === 0 ? 'A' : 'B'} that will be compared with columns
            from file ${index === 0 ? 'B' : 'A'} to determine match. Limit: 3 columns. Hint: the more unique a column's value is
            to a company, the better (DUNS number, company website, etc.).`}
          />)}
        />
      </Grid>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  user: state.user
});

export default connect(mapStateToProps)(UploadDocumentColumn);