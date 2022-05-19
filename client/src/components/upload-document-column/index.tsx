import React, { useEffect } from 'react';
import { Checkbox, Typography } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import FileSelectionFieldContainer from '../../containers/file-selection-field';
import PinnedFileChipContainer from '../../containers/pinned-file-chip';
import FileSourceRadioContainer from '../../containers/file-source-radio';
import ComparisonColumnAutocompleteContainer from '../../containers/comparison-column-autocomplete';
import FileStructureRadioContainer from '../../containers/file-structure-radio';
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging } from 'devextreme-react/data-grid';
import UnformattedDataTextfieldContainer from '../../containers/unformatted-data-textfield-container';
import { FORMATTED_DATA } from '../../state/actions/document';
import PartnerNameTextfieldContainer from '../../containers/partner-name-textfield';
import PartnerCompanyTextfieldContainer from '../../containers/partner-company-textfield';

interface UploadDocumentColumnProps {
  selectedDocument: any;
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

const renderGridCell = (
  data: any,
  handleColumnClick: any,
  comparisonColumns: Array<string>,
  index: number
) => {
  return (
    <div>
      {data.column? data.column.dataField : data}
      <Checkbox
        onClick={() => {
          handleColumnClick(data, index)
        }}
        checked={comparisonColumns.indexOf(data) > -1}
      />
    </div>
  );
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
        <Typography variant='h6' sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
          {index === 0 ? 'My accounts' : 'Partner\'s accounts'}
        </Typography>
        <FileStructureRadioContainer
          index={index}
          fileStructure={fileStructure}
        />
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
        {fileStructure === FORMATTED_DATA ?
          <>
            <ComparisonColumnAutocompleteContainer
              selectedDocument={selectedDocument}
              comparisonColumns={comparisonColumns}
              comparisonColumnsError={comparisonColumnsError}
              index={index}
            />
            <div style={{ width: '100%'}}>
              <Typography variant="subtitle1" sx={{ margin: '2.5rem 0 0 0'}}>
                The grid below shows 2 example rows from the uploaded file. Columns for comparison can be selected by clicking the column headers.
              </Typography>
              <DataGrid
                id="gridContainer"
                dataSource={selectedDocument.columnChooserGridData}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showBorders={true}
              >
                {selectedDocument.allColumns ? selectedDocument.allColumns.map((colProps: any, colIdx: number) => {
                  return (
                    <Column
                      dataField={colProps}
                      key={`col-${colIdx}-1`}
                      headerCellRender={() => renderGridCell(colProps, handleColumnClick, comparisonColumns, index)}
                    />
                  );
                }) : []}
                <Paging defaultPageSize={2} />
                <Pager
                  visible={true}
                  displayMode={"full"}
                  showPageSizeSelector={false}
                  showInfo={true}
                  showNavigationButtons={true}
                />
              </DataGrid>
              {index === 1 && <PartnerNameTextfieldContainer />}
              {index === 1 && <PartnerCompanyTextfieldContainer />}
            </div>
          </>:
          <UnformattedDataTextfieldContainer
            unformattedData={unformattedData}
            index={index}
          />}
    </>
  );
}

export default UploadDocumentColumn;