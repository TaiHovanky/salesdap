import React, { useCallback } from 'react';
import DataGrid, { Paging, Pager, Column, ColumnChooser } from 'devextreme-react/data-grid';
import { Grid } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import { updateColumnsForDocument } from '../../utils/results-preview.utils';

interface Props {
  duplicatesData: Array<any>;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
  fileStructure1: string;
  fileStructure2: string;
  user: UserState;
}

const DuplicatesTable = ({
  duplicatesData,
  comparisonColumns1,
  comparisonColumns2,
  fileStructure1,
  fileStructure2,
  user
}: Props) => {
  const customizeColumns = useCallback((columns) => {
    columns.push({
        caption: "My accounts",
        isBand: true,
        cssClass: 'my-accounts'
    });
    columns.push({
      caption: "Partner's accounts",
      isBand: true,
      cssClass: 'their-accounts'
    });

    /* Create a list of column names */
    let comparisonColumns: Array<string> = [];
    comparisonColumns = updateColumnsForDocument(fileStructure1, comparisonColumns1, 1);
    comparisonColumns = [...columns, ...updateColumnsForDocument(fileStructure2, comparisonColumns2, 2)];

    /* userAccountColumnCount is for determining how many columns should have the my-accounts css class
    and belong to the ownerBand */
    let userAccountColumnCount = fileStructure1 === 'structured' ?
      comparisonColumns1.length : 1;

    /* Assign the columns belonging to the user to one owner band and CSS class, and the columns belonging to
    their partner's accounts into another owner band and CSS class */
    for (let i = 3; i < columns.length - 1; i++) {
      if (comparisonColumns[i - 3] === columns[i].caption && i < userAccountColumnCount + 3) {
        columns[i].ownerBand = columns.length - 2;
        columns[i].cssClass = 'my-accounts'
      } else if (comparisonColumns[i - 3] === columns[i].caption) {
        columns[i].ownerBand = columns.length - 1;
        columns[i].cssClass = 'their-accounts'
      }
    }
  }, [comparisonColumns1, comparisonColumns2]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%', margin: '3.5rem 0 4.5rem 0', padding: '0 1rem' }}
    >
      <Grid
        item
        container
        xs={12}
        md={12}
        p={0}
        sx={{ height: '100%', width: '100%' }}
        direction="column"
        justifyContent="start"
        alignItems="center"
      >
        <DataGrid
          id="gridContainer"
          dataSource={duplicatesData}
          customizeColumns={customizeColumns}
          showColumnLines={true}
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
          rowAlternationEnabled={true}
        >
          <ColumnChooser mode="select" enabled={true} allowSearch={true} />
          <Column dataField="precision" groupIndex={0} sortOrder="desc" name="Precision of match" visible={false} />
          <Column fixed={true} fixedPosition="left" width={150} calculateCellValue={() => `${user.firstname} ${user.lastname}`} caption="Current User" />
          {duplicatesData && duplicatesData[0] && Array.from(Object.keys(duplicatesData[0]))
            .map((colName: string, colIndex: number) => {
              return (
                <Column dataField={colName} key={colIndex} caption={colName.replace('--2', '')} visible={colIndex !== 0} />
              );
            })}
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

export default DuplicatesTable;