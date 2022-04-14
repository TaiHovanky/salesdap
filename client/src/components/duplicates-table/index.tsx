import React from 'react';
import DataGrid, { Paging, Pager, Column } from 'devextreme-react/data-grid';
import { connect } from 'react-redux';
import { Grid } from '@mui/material';

const DuplicatesTable = ({ duplicatesData }: any) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '90%', marginTop: '3.5rem', padding: '0 2rem' }}
    >
      <Grid
        item
        container
        xs={12}
        md={12}
        p={0}
        sx={{ height: '95%', width: '100%' }}
        direction="column"
        justifyContent="start"
        alignItems="center"
      >
        <DataGrid
          id="gridContainer"
          dataSource={duplicatesData}
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          rowAlternationEnabled={true}
        >
          <Column dataField="precision" groupIndex={0} sortOrder="desc"/>
          {duplicatesData && duplicatesData[0] && Array.from(Object.keys(duplicatesData[0]))
            .map((colName: string, index: number) => <Column dataField={colName} key={index} />)}
          <Paging defaultPageSize={25} />
          <Pager
            visible={true}
            displayMode={"full"}
            showPageSizeSelector={false}
            showInfo={true}
            showNavigationButtons={true}
          />
        </DataGrid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData
});

export default connect(mapStateToProps)(DuplicatesTable);