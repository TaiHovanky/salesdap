import React from 'react';
import { Typography, Grid } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import FileSelectionFieldContainer from '../../containers/file-selection-field';
import PinnedFileChipContainer from '../../containers/pinned-file-chip';
import FileSourceRadioContainer from '../../containers/file-source-radio';
import ComparisonColumnAutocompleteContainer from '../../containers/comparison-column-autocomplete';

interface UploadDocumentColumnProps {
  selectedDocument: any;
  comparisonColumns: Array<string>;
  fileSource: string;
  index: number;
  user: UserState;
}

const UploadDocumentColumn = ({
  selectedDocument,
  comparisonColumns,
  fileSource,
  index,
  user,
}: UploadDocumentColumnProps) => {
  return (
    <>
      <Typography variant='h6' sx={{ marginTop: '2rem' }}>
        {index === 0 ? 'My accounts' : 'Customer\'s accounts'}
      </Typography>
      <div style={{ height: '100px' }}>
        {!!user.pinnedFile && index === 0 && <FileSourceRadioContainer
          fileSource={fileSource}
          index={index}
        />}
      </div>
      <div style={{ height: '80px' }}>
        {fileSource === 'upload' ?
          <FileSelectionFieldContainer selectedDocument={selectedDocument} index={index} /> :
          <PinnedFileChipContainer />
        }
      </div>
      <ComparisonColumnAutocompleteContainer
        selectedDocument={selectedDocument}
        comparisonColumns={comparisonColumns}
        index={index}
      />
    </>
  );
}

export default UploadDocumentColumn;