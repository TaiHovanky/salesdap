import React, { useRef } from 'react';
import { AttachFile, PushPin } from '@mui/icons-material';
import {
  Fab,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { UserState } from '../../state/reducers/user';

interface Props {
  validateAndSetFileSelection: any;
  selectedDocument: any;
  index: number;
  handleFilePinning: any;
  user: UserState;
}

const FileSelectionField = ({
  selectedDocument,
  validateAndSetFileSelection,
  index,
  handleFilePinning,
  user
}: Props) => {
  const inputFileRef: any = useRef( null );
  
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
    <>
      <Fab
        variant="extended"
        aria-label="add"
        sx={{ margin: '0.5rem auto 0' }}
        onClick={handleFileSelectionBtnClick}
      >
        <AttachFile sx={{ mr: 1 }} />
        Select File
      </Fab>
      <input
        type="file"
        ref={inputFileRef}
        className="file-input"
        onChange={(event: any) => validateAndSetFileSelection(event, index)}
        name="sales_file"
      />
      {selectedDocument && selectedDocument.name &&
        <div className="selected-file-div">
          <Typography variant="subtitle1" sx={{ marginTop: '1rem' }}>
            {selectedDocument.name}
          </Typography>
          {index === 0 && (
            <Tooltip title="Pin a list for future comparisons" arrow>
              <IconButton
                sx={{ margin: '0.5rem' }}
                onClick={() => handleFilePinning(selectedDocument.fileBlob)}
                disabled={user.pinnedFileName === selectedDocument.name}
              >
                <PushPin />
              </IconButton>
            </Tooltip>
          )}
        </div>
      }
    </>
  )
}

export default FileSelectionField;