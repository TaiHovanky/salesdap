import React, { useRef, useEffect } from 'react';
import {
  Grid,
  Fab
} from '@mui/material';
import axios from 'axios';
import { DataGrid, ColumnChooser, ColumnFixing, Paging, Pager } from 'devextreme-react/data-grid';
import { Upload } from '@mui/icons-material';
import { connect } from 'react-redux';
import UploadDocumentColumn from '../upload-document-column';
import { uploadDocumentSuccess } from '../../state/actions/document';
import { changeStep } from '../../state/actions/step-progress';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface UploadDocumentFormProps {
  dispatch: any;
  activeStep: number;
  selectedDocument1: any;
  selectedDocument2: any;
  comparisonColumn1: string;
  comparisonColumn2: string;
  fileSource1: string;
  fileSource2: string;
}

const UploadDocumentForm = ({
  dispatch,
  activeStep,
  selectedDocument1,
  selectedDocument2,
  comparisonColumn1,
  comparisonColumn2,
  fileSource1,
  fileSource2,
}: UploadDocumentFormProps): any => {
  const dataGrid1 = useRef<any>(null);
  const dataGrid2 = useRef<any>(null);

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
   */
  const handleUpload = () => {
    dispatch(setIsLoading(true));
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
    formData.append('comparisonColumn1', comparisonColumn1);
    formData.append('comparisonColumn2', comparisonColumn2);
    formData.append('resultColumns1', resultColumns1);
    formData.append('resultColumns2', resultColumns2);

    axios.post('/api/v1/uploadfile', formData)
      .then((res) => {
        dispatch(hideError());
        dispatch(uploadDocumentSuccess(res.data));
        dispatch(setIsLoading(false));
        dispatch(changeStep(activeStep += 1));
      })
      .catch((err: any) => {
        dispatch(setIsLoading(false));
        dispatch(showError(`File upload and comparison failed. ${err}`));
      });
  };

  const isSubmitBtnEnabled = selectedDocument1 && selectedDocument2 &&
    comparisonColumn1 && comparisonColumn2;

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: '90%' }}
      >
        <Grid
          item
          container
          xs={4}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="start"
          alignItems="center"
        >
          <UploadDocumentColumn
            comparisonColumn={comparisonColumn1}
            index={0}
            selectedDocument={selectedDocument1}
            fileSource={fileSource1}
          />
          <div style={{ width: '100%'}}>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument1.data || []}
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
          xs={4}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="start"
          alignItems="center"
        >
          <UploadDocumentColumn
            comparisonColumn={comparisonColumn2}
            index={1}
            selectedDocument={selectedDocument2}
            fileSource={fileSource2}
          />
          <div style={{ width: '100%'}}>
            <DataGrid
              id="gridContainer"
              dataSource={selectedDocument2.data || []}
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
            onClick={handleUpload}
          >
            <Upload sx={{ mr: 1 }} />
            Upload and Compare
          </Fab>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  selectedDocument1: state.document.selectedDocument1,
  selectedDocument2: state.document.selectedDocument2,
  comparisonColumn1: state.document.comparisonColumn1,
  comparisonColumn2: state.document.comparisonColumn2,
  fileSource1: state.document.fileSource1,
  fileSource2: state.document.fileSource2,
  user: state.user
});

export default connect<any, any, any>(mapStateToProps)(UploadDocumentForm);