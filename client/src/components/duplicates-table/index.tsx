import React from 'react';
import { DataGrid, Paging, Pager } from 'devextreme-react/data-grid';
import { connect } from 'react-redux';
import { Grid } from '@mui/material';

interface Props {
  duplicatesData: Array<any>;
}

const DuplicatesTable = ({ duplicatesData }: Props): any => {
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
          rowAlternationEnabled={true}
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
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData
});

export default connect(mapStateToProps)(DuplicatesTable);