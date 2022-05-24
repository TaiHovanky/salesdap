import React, { useEffect, useState } from 'react';
import { FormLabel, IconButton, Typography } from '@mui/material';
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
import { Help } from '@mui/icons-material';
import ChooseColumnHelpModal from '../choose-column-help-modal';
import FileSourceHelpModal from '../file-source-help-modal';

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
  const [isChooseColumnHelpModalOpen, setIsChooseColumnHelpModalOpen] = useState(false);
  const [isSelectFileSourceHelpModalOpen, setIsSelectFileSourceHelpModalOpen] = useState(false);

  useEffect(() => {
    if (selectedDocument.data && selectedDocument.data[0]) {
      setAllColumns(Array.from(Object.keys(selectedDocument.data[0])), index);
    }
  }, [selectedDocument.data, setAllColumns, index]);

  const handleOpenFileSourceHelpModal = () => {
    setIsSelectFileSourceHelpModalOpen(!isSelectFileSourceHelpModalOpen);
  }

  const handleOpenChooseColumnHelpModal = () => {
    setIsChooseColumnHelpModalOpen(!isChooseColumnHelpModalOpen);
  }

  return (
    <>
      <Typography variant='h6' sx={{ marginTop: '3rem', marginBottom: '1rem' }}>
        {index === 0 ? 'MY ACCOUNTS' : 'PARTNER\'S ACCOUNTS'}
      </Typography>
      <FileStructureRadioContainer
        index={index}
        fileStructure={fileStructure}
      />
      {fileStructure === FORMATTED_DATA ?
        <>
          <FormLabel sx={{ marginTop: '3rem' }}>Select a file <IconButton onClick={handleOpenFileSourceHelpModal}><Help /></IconButton></FormLabel>
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
          <FormLabel sx={{ marginTop: '3rem' }}>Use autocomplete field or data grid to pick columns <IconButton onClick={handleOpenChooseColumnHelpModal}><Help /></IconButton></FormLabel>
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
      <ChooseColumnHelpModal isHelpModalOpen={isChooseColumnHelpModalOpen} handleOpenHelpModal={handleOpenChooseColumnHelpModal} />
      <FileSourceHelpModal isHelpModalOpen={isSelectFileSourceHelpModalOpen} handleOpenHelpModal={handleOpenFileSourceHelpModal} />
    </>
  );
}

export default UploadDocumentColumn;