import React from 'react';
import { connect } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const createColumns = (rowObject: any): GridColDef[] => {
  const columnNames = Array.from(Object.keys(rowObject));
  return columnNames.map((rowProperty: string) => ({
    field: rowProperty,
    headerName: rowProperty,
    flex: 2
  }));
}

const DuplicatesTable = ({ documentData }: any) => {
  const columns: Array<GridColDef> = documentData.length ? createColumns(documentData[0]) : [];
  const rows: Array<any> = documentData.map((row: any, index: number) => ({
    ...row,
    id: index
  }));
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sx={{ height: '95%', width: '100%', marginTop: '3rem' }}
    />
  );
}

const mapStateToProps = (state: any) => ({
  documentData: state.document.documentData
})

export default connect(mapStateToProps)(DuplicatesTable);