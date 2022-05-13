import React, { useEffect } from 'react';
import { Checkbox, TextField, Typography } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import FileSelectionFieldContainer from '../../containers/file-selection-field';
import PinnedFileChipContainer from '../../containers/pinned-file-chip';
import FileSourceRadioContainer from '../../containers/file-source-radio';
import ComparisonColumnAutocompleteContainer from '../../containers/comparison-column-autocomplete';
import FileStructureRadioContainer from '../../containers/file-structure-radio';
import { DataGrid } from 'devextreme-react';
import { Column, Pager, Paging } from 'devextreme-react/data-grid';
import UnstructuredDataTextfieldContainer from '../../containers/unstructured-data-textfield-container';

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
  unstructuredData: string;
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
  unstructuredData
}: UploadDocumentColumnProps) => {
  useEffect(() => {
    if (selectedDocument.data && selectedDocument.data[0]) {
      setAllColumns(Array.from(Object.keys(selectedDocument.data[0])), index);
    }
  }, [selectedDocument.data, setAllColumns]);

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
        {fileStructure === 'structured' ?
          <>
            <ComparisonColumnAutocompleteContainer
              selectedDocument={selectedDocument}
              comparisonColumns={comparisonColumns}
              comparisonColumnsError={comparisonColumnsError}
              index={index}
            />
            <div style={{ width: '100%'}}>
              <Typography variant="subtitle1" sx={{ margin: '2.5rem 0 0 0'}}>
                This grid helps visualize the file that was uploaded with 2 example rows. Columns for comparison can be selected by clicking the column headers.
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
            </div>
          </>:
          <UnstructuredDataTextfieldContainer
            unstructuredData={unstructuredData}
            index={index}
          />}
    </>
  );
}

export default UploadDocumentColumn;