import React from 'react';
import { connect } from 'react-redux';
import DataGrid, { Paging, Pager } from 'devextreme-react/data-grid';
import {
  Grid
} from '@mui/material';

const DuplicatesTable = ({ documentData }: any) => {
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
            dataSource={documentData}
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
      /* <div style={{ flexGrow: 1 }}> */
      /* </div> */
    // </div>
  );
}

const mapStateToProps = (state: any) => ({
  documentData: state.document.documentData
});

export default connect(mapStateToProps)(DuplicatesTable);