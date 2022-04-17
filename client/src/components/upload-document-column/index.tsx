import React from 'react';
import { Typography, Grid } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import FileSelectionField from '../file-selection-field';
import PinnedFileChip from '../pinned-file-chip';
import ComparisonColumnAutocomplete from '../comparison-column-autocomplete';
import FileSourceRadio from '../file-source-radio';

interface UploadDocumentColumnProps {
  selectedDocument: any;
  comparisonColumns: Array<string>;
  fileSource: string;
  index: number;
  user: UserState;
  validateAndSetFileSelection: any;
  handleFileTypeChange: any;
}

const UploadDocumentColumn = ({
  selectedDocument,
  comparisonColumns,
  fileSource,
  index,
  user,
  validateAndSetFileSelection,
  handleFileTypeChange
}: UploadDocumentColumnProps) => {
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
          {!!user.pinnedFile && index === 0 && <FileSourceRadio
            fileSource={fileSource}
            handleFileTypeChange={handleFileTypeChange}
            index={index}
          />}
        </div>
        <div style={{ height: '80px' }}>
          {fileSource === 'upload' ?
            <FileSelectionField
              selectedDocument={selectedDocument}
              validateAndSetFileSelection={validateAndSetFileSelection}
              index={index}
            /> :
            <PinnedFileChip user={user} />
          }
        </div>
        <ComparisonColumnAutocomplete
          selectedDocument={selectedDocument}
          comparisonColumns={comparisonColumns}
          index={index}
        />
      </Grid>
    </>
  );
}

export default UploadDocumentColumn;