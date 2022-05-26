import React, { useRef } from 'react';
import DataGrid, { Paging, Pager, Column, ColumnChooser, Toolbar, Item } from 'devextreme-react/data-grid';
import { Button, Grid } from '@mui/material';
import { UserState } from '../../state/reducers/user';
import { updateColumnsForDocument } from '../../utils/results-preview.utils';
import { FORMATTED_DATA } from '../../state/actions/document';
import { createCapitalizedPartnerCompany, createCapitalizedPartnerName, createCapitalizedUserName } from '../../utils/duplicates-table.utils';

interface Props {
  duplicatesData: Array<any>;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
  fileStructure1: string;
  fileStructure2: string;
  partnerName: string;
  partnerCompany: string;
  user: UserState;
}

/* Handles the pressence of the 2 accuracy columns. Other columns start after those 2. */
const COLUMN_OFFSET = 2;

const DuplicatesTable = ({
  duplicatesData,
  comparisonColumns1,
  comparisonColumns2,
  fileStructure1,
  fileStructure2,
  partnerName,
  partnerCompany,
  user
}: Props) => {
  const dataGridRef: any = useRef<any>(null);

  const customizeColumns = (columns: Array<any>) => {
    /* Capitalize names that will be used in column captions */
    let capitalizedUserName: string = createCapitalizedUserName(user);
    let capitalizedPartnerCompany: string = createCapitalizedPartnerCompany(partnerCompany);
    let capitalizedPartnerName: string = createCapitalizedPartnerName(partnerName);

    columns.push({
        caption: `My accounts${capitalizedUserName ? ` (${capitalizedUserName})` : ''}`,
        isBand: true,
        cssClass: 'my-accounts'
    });
    columns.push({
      caption: `${capitalizedPartnerCompany ? `${capitalizedPartnerCompany}` : 'Partner'} accounts${capitalizedPartnerName ? ` (${capitalizedPartnerName})` : ''}`,
      isBand: true,
      cssClass: 'their-accounts'
    });

    /* Create a list of column names */
    let comparisonColumns: Array<string> = [];
    comparisonColumns = updateColumnsForDocument(fileStructure1, comparisonColumns1, 1);
    comparisonColumns = [...comparisonColumns, ...updateColumnsForDocument(fileStructure2, comparisonColumns2, 2)];

    /* userAccountColumnCount is for determining how many columns should have the my-accounts css class
    and belong to the ownerBand */
    let userAccountColumnCount = fileStructure1 === FORMATTED_DATA ?
      comparisonColumns1.length : 1;

    /* Assign the columns belonging to the user to one owner band and CSS class, and the columns belonging to
    their partner's accounts into another owner band and CSS class */
    for (let i = COLUMN_OFFSET; i < columns.length - 1; i++) {
      if (comparisonColumns[i - COLUMN_OFFSET] === columns[i].caption && i < userAccountColumnCount + COLUMN_OFFSET) {
        columns[i].ownerBand = columns.length - 2;
        columns[i].cssClass = 'my-accounts'
      } else if (comparisonColumns[i - COLUMN_OFFSET] === columns[i].caption) {
        columns[i].ownerBand = columns.length - 1;
        columns[i].cssClass = 'their-accounts'
      }
    }
  }

  const calculateGroupCell = (options: any) => {
    let column = options.column;
    let displayValue: string = options.value.split(";")[1];
    return (
        <div>{column.caption + ": " + displayValue}</div>
    );
  }

  const calculateAccuracyLevel = (rowData: any) => {
    switch (rowData.accuracy) {
      case 1:
        // if (comparisonColumns1.length > 1 && comparisonColumns2.length > 1) {
        return `aaa;Low`;
      case 2:
        return `bbb;Medium`;
      case 3:
        return `ccc;High`;
    }
  }

  const handleColumnChooserOpen = () => {
    dataGridRef.current.instance.showColumnChooser();
  }

  const renderColChooserBtn = () => {
    return (
      <Button variant="outlined" onClick={handleColumnChooserOpen}>
        edit view
      </Button>
    );
  }

  const renderLabel = () => {
    return <div className="toolbar-label"><b>{duplicatesData.length} Matches</b></div>;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%', margin: '3rem 0 4.5rem 0', padding: '0 1rem' }}
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
          ref={dataGridRef}
        >
          <ColumnChooser
            mode="select"
            title="Edit View"
            enabled={true}
            allowSearch={true}
            height={500}
            width={350}
          />
          <Column
            dataField="accuracy"
            groupIndex={0}
            name="Accuracy Level"
            calculateGroupValue={calculateAccuracyLevel}
            groupCellRender={calculateGroupCell}
            showInColumnChooser={false}
            sortOrder="desc"
            visible={false}
          />
          {duplicatesData && duplicatesData[0] && Array.from(Object.keys(duplicatesData[0]))
            .map((colName: string, colIndex: number) => (
              <Column
                dataField={colName}
                key={colIndex}
                caption={colName.replace('--2', '')}
                visible={colIndex !== 0}
                showInColumnChooser={colName !== 'accuracy' ? true : false}
              />
            ))}
          <Paging defaultPageSize={25} />
          <Pager
            visible={true}
            displayMode={"full"}
            showPageSizeSelector={false}
            showInfo={true}
            showNavigationButtons={true}
          />
          <Toolbar>
            <Item location="center"
              locateInMenu="never"
              render={renderLabel}
            />
            <Item name="columnChooserButton" component={renderColChooserBtn}></Item>
          </Toolbar>
        </DataGrid>
      </Grid>
    </Grid>
  );
}

export default DuplicatesTable;