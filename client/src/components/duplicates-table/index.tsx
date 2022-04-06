import React from 'react';
import { connect } from 'react-redux';
import DataGrid, { Paging, Pager } from 'devextreme-react/data-grid';
import {
  Grid
} from '@mui/material';

const DuplicatesTable = ({ duplicatesData }: any) => {
  return (
    // <div style={{ display: 'flex', height: '100%', width: '100%' }}>
    <Grid
      container
      spacing={2}
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: '90%', marginTop: '3rem' }}
    >
      <Grid
        item
        container
        xs={12}
        sx={{ height: '100%' }}
        direction="column"
        justifyContent="start"
        alignItems="center"
      >
        <div style={{ width: '100%'}}>
          <DataGrid
            id="gridContainer"
            dataSource={duplicatesData}
            allowColumnReordering={true}
            allowColumnResizing={true}
            columnAutoWidth={true}
            showBorders={true}
          >
            <Paging defaultPageSize={25} />
            <Pager
              visible={true}
              displayMode={"full"}
              showPageSizeSelector={false}
              showInfo={true}
              showNavigationButtons={true}
            />
          </DataGrid>

        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData
});

export default connect(mapStateToProps)(DuplicatesTable);