import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import UploadDocumentColumnContainer from '../../containers/upload-document-column';
import DataGrid, { ColumnChooser, ColumnFixing, Paging, Pager } from 'devextreme-react/data-grid';
import { Grid, Fab, Typography } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { DocumentState } from '../../state/reducers/document';

interface UploadDocumentFormProps {
  document: DocumentState;
  // handleUploadAndCompare: any;
  activeStep: number;
  showError: any;
  hideError: any;
  uploadDocumentSuccess: any;
  setIsLoading: any;
  changeStep: any;
}

const UploadDocumentForm = ({
  document,
  // handleUploadAndCompare,
  activeStep,
  showError,
  hideError,
  uploadDocumentSuccess,
  setIsLoading,
  changeStep,
}: UploadDocumentFormProps): any => {
  const dataGrid1 = useRef<any>(null);
  const dataGrid2 = useRef<any>(null);

  const {
    selectedDocument1,
    selectedDocument2,
    comparisonColumns1,
    comparisonColumns2,
    comparisonColumns1Error,
    comparisonColumns2Error,
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

  /**
   * Puts the selected file and column name into a FormData instance,
   * sends it to the server, and then changes to the next step where
   * the duplicates will be displayed
   * Note: because we use the dataGrid ref to get the resultColumns, we're breaking from the pattern
   * of smart container/dumb component here.
   */
   const handleUploadAndCompare = () => {
    setIsLoading(true);
    const formData = new FormData();
    if (selectedDocument1 && selectedDocument1.name) {
      const docBlob1 = new Blob([JSON.stringify(selectedDocument1.data)], { type: 'application/json' });
      formData.append("sales_file1", docBlob1, selectedDocument1.name);
    }

    if (selectedDocument2 && selectedDocument2.name) {
      const docBlob2 = new Blob([JSON.stringify(selectedDocument2.data)], { type: 'application/json' });
      formData.append("sales_file2", docBlob2, selectedDocument2.name);
    }
    let resultColumns1;
    let resultColumns2;
    if (dataGrid1 && dataGrid1.current && dataGrid1.current.instance) {
      resultColumns1 = dataGrid1.current.instance.getVisibleColumns().map((col: any) => col.dataField);
    }
    if (dataGrid1 && dataGrid2.current && dataGrid2.current.instance) {
      resultColumns2 = dataGrid2.current.instance.getVisibleColumns().map((col: any) => col.dataField);
    }
    formData.append('comparisonColumns1', comparisonColumns1.join());
    formData.append('comparisonColumns2', comparisonColumns2.join());
    formData.append('resultColumns1', resultColumns1.join());
    formData.append('resultColumns2', resultColumns2.join());

    axios.post('/api/v1/uploadfile', formData)
      .then((res: any) => {
        hideError();
        uploadDocumentSuccess(res.data);
        setIsLoading(false);
        changeStep(activeStep += 1);
      })
      .catch((err: any) => {
        setIsLoading(false);
        showError(`File upload and comparison failed. ${err}`);
      });
  };


  const isSubmitBtnEnabled = selectedDocument1 && selectedDocument2 &&
    comparisonColumns1.length && comparisonColumns2.length &&
    !comparisonColumns1Error && !comparisonColumns2Error;

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
            comparisonColumnsError={comparisonColumns1Error}
            selectedDocument={selectedDocument1}
            fileSource={fileSource1}
            index={0}
          />
          <div style={{ width: '100%'}}>
            <Typography variant="subtitle1" sx={{ margin: '2.5rem 0 0 0'}}>
              Click and drag columns that are NOT wanted in results table to Unwanted Columns in the data grid below
            </Typography>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument1.data}
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={true}
              ref={dataGrid1}
            >
              <ColumnChooser enabled={true} height={150} title="Unwanted columns" />
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
            comparisonColumnsError={comparisonColumns2Error}
            selectedDocument={selectedDocument2}
            fileSource={fileSource2}
            index={1}
          />
          <div style={{ width: '100%'}}>
            <Typography variant="subtitle1" sx={{ margin: '2.5rem 0 0 0'}}>
              Click and drag columns that are NOT wanted in results table to Unwanted Columns in the data grid below
            </Typography>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument2.data}
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={true}
              ref={dataGrid2}
            >
              <ColumnChooser enabled={true} height={150} title="Unwanted columns" />
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