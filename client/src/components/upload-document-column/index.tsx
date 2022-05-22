import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import FileSelectionFieldContainer from '../../containers/file-selection-field';
import PinnedFileChipContainer from '../../containers/pinned-file-chip';
import FileSourceRadioContainer from '../../containers/file-source-radio';
import ComparisonColumnAutocompleteContainer from '../../containers/comparison-column-autocomplete';
import FileStructureRadioContainer from '../../containers/file-structure-radio';
import UnformattedDataTextfieldContainer from '../../containers/unformatted-data-textfield-container';
import { FORMATTED_DATA } from '../../state/actions/document';
import PartnerNameTextfieldContainer from '../../containers/partner-name-textfield';
import PartnerCompanyTextfieldContainer from '../../containers/partner-company-textfield';
import FileDataPreviewTable from '../file-data-preview-table';
import { SelectedDocument } from '../../state/reducers/document';

interface UploadDocumentColumnProps {
  selectedDocument: SelectedDocument;
  comparisonColumns: Array<string>;
  comparisonColumnsError: Array<string>;
  fileSource: string;
  index: number;
  user: UserState;
  setAllColumns: any;
  handleColumnClick: any;
  fileStructure: any;
  unformattedData: string;
}

const UploadDocumentColumn = ({
  selectedDocument,
  comparisonColumns,
  comparisonColumnsError,
  fileSource,
  index,
  user,
  setAllColumns,
  handleColumnClick,
  fileStructure,
  unformattedData
}: UploadDocumentColumnProps) => {
  useEffect(() => {
    if (selectedDocument.data && selectedDocument.data[0]) {
      setAllColumns(Array.from(Object.keys(selectedDocument.data[0])), index);
    }
  }, [selectedDocument.data, setAllColumns, index]);

  return (
    <>
      <Typography variant='h6' sx={{ marginTop: '3rem', marginBottom: '1rem' }}>
        {index === 0 ? 'My accounts' : 'Partner\'s accounts'}
      </Typography>
      <FileStructureRadioContainer
        index={index}
        fileStructure={fileStructure}
      />
      {fileStructure === FORMATTED_DATA ?
        <>
          {!!user.pinnedFileName && index === 0 && <FileSourceRadioContainer
            fileSource={fileSource}
            index={index}
          />}
          <div>
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
          <div style={{ width: '100%'}}>
            <FileDataPreviewTable
              selectedDocument={selectedDocument}
              handleColumnClick={handleColumnClick}
              comparisonColumns={comparisonColumns}
              index={index}
            />
          </div>
        </>:
        <>
          <UnformattedDataTextfieldContainer
            unformattedData={unformattedData}
            index={index}
          />
        </>
      }
      {index === 1 && <PartnerNameTextfieldContainer />}
      {index === 1 && <PartnerCompanyTextfieldContainer />}
    </>
  );
}

export default UploadDocumentColumn;