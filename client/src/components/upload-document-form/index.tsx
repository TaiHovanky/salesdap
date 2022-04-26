import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import UploadDocumentColumnContainer from '../../containers/upload-document-column';
import DataGrid, { Paging, Pager, Column } from 'devextreme-react/data-grid';
import { Grid, Fab, Typography, Checkbox } from '@mui/material';
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
  handleColumnClick: any;
}

const renderGridCell = (
  data: any,
  handleColumnClick: any,
  comparisonColumns: Array<string>,
  index: number
) => {
  return (
    <div>
      {data.column? data.column.dataField : data}
      <Checkbox
        onClick={() => {
          handleColumnClick(data, index)
        }}
        checked={comparisonColumns.indexOf(data) > -1}
      />
    </div>
  );
}

const UploadDocumentForm = ({
  document,
  activeStep,
  showError,
  hideError,
  uploadDocumentSuccess,
  setIsLoading,
  changeStep,
  setAllColumns,
  handleColumnClick
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
    if (selectedDocument1.data && selectedDocument1.data[0]) {
      setAllColumns(Array.from(Object.keys(selectedDocument1.data[0])), 0);
    }
    if (selectedDocument2.data && selectedDocument2.data[0]) {
      setAllColumns(Array.from(Object.keys(selectedDocument2.data[0])), 1);
    }
  }, [selectedDocument1.data, selectedDocument2.data, setAllColumns]);

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

    formData.append('comparisonColumns1', comparisonColumns1.join());
    formData.append('comparisonColumns2', comparisonColumns2.join());
    formData.append('resultColumns1', comparisonColumns1.join());
    formData.append('resultColumns2', comparisonColumns2.join());

    axios.post('/api/v1/uploadfile', formData)
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
              This grid helps visualize the file that was uploaded with 2 example rows. Columns for comparison can be selected by clicking the column headers.
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
              {selectedDocument1.allColumns ? selectedDocument1.allColumns.map((colProps: any, colIdx: number) => {
                return (
                  <Column
                    dataField={colProps}
                    key={`col-${colIdx}-0`}
                    headerCellRender={() => renderGridCell(colProps, handleColumnClick, comparisonColumns1, 0)}
                  />
                );
              }) : []}
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
          <UploadDocumentColumnContainer
            comparisonColumns={comparisonColumns2}
            comparisonColumnsError={comparisonColumns2Error}
            selectedDocument={selectedDocument2}
            fileSource={fileSource2}
            index={1}
          />
          <div style={{ width: '100%'}}>
            <Typography variant="subtitle1" sx={{ margin: '2.5rem 0 0 0'}}>
              This grid helps visualize the file that was uploaded with 2 example rows. Columns for comparison can be selected by clicking the column headers.
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
              {selectedDocument2.allColumns ? selectedDocument2.allColumns.map((colProps: any, colIdx: number) => {
                return (
                  <Column
                    dataField={colProps}
                    key={`col-${colIdx}-1`}
                    headerCellRender={() => renderGridCell(colProps, handleColumnClick, comparisonColumns2, 1)}
                  />
                );
              }) : []}
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