import React, { useRef } from 'react';
import { AttachFile } from '@mui/icons-material';
import {
  Fab,
  Typography,
} from '@mui/material';

interface Props {
  validateAndSetFileSelection: any;
  selectedDocument: any;
  index: number;
}

const FileSelectionField = ({ selectedDocument, validateAndSetFileSelection, index }: Props) => {
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
        onChange={(event: any) => validateAndSetFileSelection(event, index)}
        name="sales_file"
      />
      <div style={{ height: '2rem', marginTop: '1rem' }}>
        {selectedDocument && selectedDocument.name &&
          <Typography variant="subtitle1">
            {selectedDocument.name}
          </Typography>
        }
      </div>
    </>
  )
}

export default FileSelectionField;