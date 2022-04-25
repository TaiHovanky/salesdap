import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import UploadDocumentColumnContainer from '../../containers/upload-document-column';
import DataGrid, { ColumnChooser, ColumnFixing, Paging, Pager, Column } from 'devextreme-react/data-grid';
import { Grid, Fab, Typography } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { DocumentState } from '../../state/reducers/document';

interface UploadDocumentFormProps {
  document: DocumentState;
  activeStep: number;
  showError: any;
  hideError: any;
  uploadDocumentSuccess: any;
  setIsLoading: any;
  changeStep: any;
  setAllColumns: any;
}

const UploadDocumentForm = ({
  document,
  activeStep,
  showError,
  hideError,
  uploadDocumentSuccess,
  setIsLoading,
  changeStep,
  setAllColumns
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
    const currentDataGrid1 = dataGrid1.current;
    const currentDataGrid2 = dataGrid2.current;
    // if (currentDataGrid1 && currentDataGrid1.instance && selectedDocument1.data.length) {
    //   currentDataGrid1.instance.showColumnChooser();
    // }
    // if (currentDataGrid2 && currentDataGrid2.instance && selectedDocument2.data.length) {
    //   currentDataGrid2.instance.showColumnChooser();
    // }
    return () => {
      setAllColumns(currentDataGrid1.instance.state().columns, 0);
      setAllColumns(currentDataGrid2.instance.state().columns, 1);
    };
  }, [selectedDocument1.data.length, selectedDocument2.data.length, setAllColumns]);

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
    const resultColumns1: Array<string> = comparisonColumns1;
    const resultColumns2: Array<string> = comparisonColumns2;
    // if (dataGrid1 && dataGrid1.current && dataGrid1.current.instance) {
    //   resultColumns1 = dataGrid1.current.instance.getVisibleColumns().map((col: any) => col.dataField);
    // }
    // if (dataGrid1 && dataGrid2.current && dataGrid2.current.instance) {
    //   resultColumns2 = dataGrid2.current.instance.getVisibleColumns().map((col: any) => col.dataField);
    // }
    formData.append('comparisonColumns1', comparisonColumns1.join());
    formData.append('comparisonColumns2', comparisonColumns2.join());
    formData.append('resultColumns1', resultColumns1.join());
    formData.append('resultColumns2', resultColumns2.join());

    axios.post('http://localhost:3001/api/v1/uploadfile', formData)
      .then((res: any) => {
        hideError();
        uploadDocumentSuccess(res.data);
        setIsLoading(false);
        changeStep(activeStep += 1);
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsLoading(false);
        showError('File upload and comparison failed.');
        setTimeout(() => {
          hideError();
        }, 5000)
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
        justifyContent="center"
        alignItems="start"
      >
        <Grid
          item
          container
          xs={8}
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
            Example results data based on the columns you have chosen
            </Typography>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument1.columnChooserGridData}
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={true}
              ref={dataGrid1}
            >
              {comparisonColumns1.length ? comparisonColumns1.map((colProps: any, colIdx: number) => {
                return (
                  <Column dataField={colProps} key={`col-${colIdx}-0`} />
                );
              }) : [<Column key={'col-0-0-empty'} />]}
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
        {/* </Grid>
        <Grid
          item
          container
          xs={5}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="start"
          alignItems="center"
        > */}
          <UploadDocumentColumnContainer
            comparisonColumns={comparisonColumns2}
            comparisonColumnsError={comparisonColumns2Error}
            selectedDocument={selectedDocument2}
            fileSource={fileSource2}
            index={1}
          />
          <div style={{ width: '100%'}}>
            <Typography variant="subtitle1" sx={{ margin: '2.5rem 0 0 0'}}>
              Example results data based on the columns you have chosen
            </Typography>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument2.columnChooserGridData}
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={true}
              ref={dataGrid2}
            >
              {comparisonColumns2.length ? comparisonColumns2.map((colProps: any, colIdx: number) => {
                return (
                  <Column dataField={colProps} key={`col-${colIdx}-1`} />
                );
              }) : [<Column key={'col-0-1-empty'} />]}
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