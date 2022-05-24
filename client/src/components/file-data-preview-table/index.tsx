import React from 'react';
import { Typography, Checkbox } from '@mui/material';
import { Column, DataGrid, Pager, Paging } from 'devextreme-react/data-grid';
import { SelectedDocument } from '../../state/reducers/document';

interface Props {
  selectedDocument: SelectedDocument;
  handleColumnClick: any;
  comparisonColumns: Array<string>;
  index: number;
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

const FileDataPreviewTable = ({
  selectedDocument,
  handleColumnClick,
  comparisonColumns,
  index
}: Props) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ margin: '2rem 0 0'}}>
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
              allowSorting={false}
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
    </>
  );
}

export default FileDataPreviewTable;