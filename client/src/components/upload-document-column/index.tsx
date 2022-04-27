import React from 'react';
import { Typography } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import FileSelectionFieldContainer from '../../containers/file-selection-field';
import PinnedFileChipContainer from '../../containers/pinned-file-chip';
import FileSourceRadioContainer from '../../containers/file-source-radio';
import ComparisonColumnAutocompleteContainer from '../../containers/comparison-column-autocomplete';

interface UploadDocumentColumnProps {
  selectedDocument: any;
  comparisonColumns: Array<string>;
  comparisonColumnsError: Array<string>;
  fileSource: string;
  index: number;
  user: UserState;
}

const UploadDocumentColumn = ({
  selectedDocument,
  comparisonColumns,
  comparisonColumnsError,
  fileSource,
  index,
  user,
}: UploadDocumentColumnProps) => {
  return (
    <>
      <Typography variant='h6' sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
        {index === 0 ? 'My accounts' : 'Partner\'s accounts'}
      </Typography>
      {!!user.pinnedFileName && index === 0 && <FileSourceRadioContainer
        fileSource={fileSource}
        index={index}
      />}
      <div style={{ height: '80px' }}>
        {fileSource === 'upload' ?
          <FileSelectionFieldContainer selectedDocument={selectedDocument} index={index} /> :
          <PinnedFileChipContainer />
        }
      </div>
      <ComparisonColumnAutocompleteContainer
        selectedDocument={selectedDocument}
        comparisonColumns={comparisonColumns}
        comparisonColumnsError={comparisonColumnsError}
        index={index}
      />
    </>
  );
}

export default UploadDocumentColumn;