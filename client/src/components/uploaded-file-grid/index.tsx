import React, { useRef, useEffect } from 'react';
import DataGrid, { Column, ColumnChooser, ColumnFixing } from 'devextreme-react/data-grid';
import employees from './data';

const UploadedFileGrid = () => {
  const dataGrid = useRef<any>(null);
  useEffect(() => {
    // `current.instance` points to the UI component instance
    if (dataGrid && dataGrid.current && dataGrid.current.instance) {
      dataGrid.current.instance.showColumnChooser();
    }
  }, []);

  return (
    <div style={{ width: '100%'}}>
      <DataGrid
        id="gridContainer"
        dataSource={employees}
        keyExpr="ID"
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        showBorders={true}
        ref={dataGrid}
      >
        <ColumnChooser enabled={true} height={200} />
        <ColumnFixing enabled={true} />
        {employees && employees[0] ?
          Array.from(Object.keys(employees[0])).map((col: any) => <Column dataField={col} />) :
          null
        }
      </DataGrid>
    </div>
  );
};

export default UploadedFileGrid;