import React, { useRef, useEffect } from 'react';
import DataGrid, { ColumnChooser, ColumnFixing, Paging, Pager } from 'devextreme-react/data-grid';
import { Button } from '@mui/material';

interface Props {
  data: Array<any>;
}
const UploadedFileGrid = ({ data }: Props) => {
  const dataGrid = useRef<any>(null);

  useEffect(() => {
    // `current.instance` points to the UI component instance
    if (dataGrid && dataGrid.current && dataGrid.current.instance && data.length) {
      dataGrid.current.instance.showColumnChooser();
    }
  }, [data]);

  const getVisibleColumns = () => {
    if (dataGrid && dataGrid.current && dataGrid.current.instance) {
      console.log('datagrid instance current getting cols', dataGrid, dataGrid.current.instance.getVisibleColumns());
      dataGrid.current.instance.getVisibleColumns();
    }
  }

  return (
    <></>
  );
};

export default UploadedFileGrid;