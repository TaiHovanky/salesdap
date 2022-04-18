import React, { useRef, useEffect } from 'react';
import UploadDocumentColumnContainer from '../../containers/upload-document-column';
import { Grid, Fab } from '@mui/material';
import { Upload } from '@mui/icons-material';
import DataGrid, { ColumnChooser, ColumnFixing, Paging, Pager } from 'devextreme-react/data-grid';
import { DocumentState } from '../../state/reducers/document';

interface UploadDocumentFormProps {
  document: DocumentState;
  handleUploadAndCompare: any;
}

const UploadDocumentForm = ({
  document,
  handleUploadAndCompare,
}: UploadDocumentFormProps): any => {
  const dataGrid1 = useRef<any>(null);
  const dataGrid2 = useRef<any>(null);

  const {
    selectedDocument1,
    selectedDocument2,
    comparisonColumns1,
    comparisonColumns2,
    fileSource1,
    fileSource2
  } = document;

  useEffect(() => {
    // `current.instance` points to the UI component instance
    if (dataGrid1 && dataGrid1.current && dataGrid1.current.instance && selectedDocument1.data.length) {
      dataGrid1.current.instance.showColumnChooser();
    }
    if (dataGrid2 && dataGrid2.current && dataGrid2.current.instance && selectedDocument2.data.length) {
      dataGrid2.current.instance.showColumnChooser();
    }
  }, [selectedDocument1.data.length, selectedDocument2.data.length]);

  const isSubmitBtnEnabled = selectedDocument1 && selectedDocument2 &&
    comparisonColumns1 && comparisonColumns2;

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Grid
          item
          container
          xs={5}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="start"
          alignItems="center"
        >
          <UploadDocumentColumnContainer
            comparisonColumns={comparisonColumns1}
            selectedDocument={selectedDocument1}
            fileSource={fileSource1}
            index={0}
          />
          <div style={{ width: '100%'}}>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument1.data}
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={true}
              ref={dataGrid1}
            >
              <ColumnChooser enabled={true} height={150} />
              <ColumnFixing enabled={true} />
              <Paging defaultPageSize={2} />
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
        <Grid
          item
          container
          xs={5}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="start"
          alignItems="center"
        >
          <UploadDocumentColumnContainer
            comparisonColumns={comparisonColumns2}
            selectedDocument={selectedDocument2}
            fileSource={fileSource2}
            index={1}
          />
          <div style={{ width: '100%'}}>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument2.data}
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={true}
              ref={dataGrid2}
            >
              <ColumnChooser enabled={true} height={150} />
              <ColumnFixing enabled={true} />
              <Paging defaultPageSize={2} />
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
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ marginBottom: '4.5rem' }}
      >
        <Grid
          item
          container
          xs={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            sx={{ marginTop: '2rem' }}
            disabled={!isSubmitBtnEnabled}
            onClick={handleUploadAndCompare}
          >
            <Upload sx={{ mr: 1 }} />
            Upload and Compare
          </Fab>
        </Grid>
      </Grid>
    </>
  );
};

export default UploadDocumentForm;