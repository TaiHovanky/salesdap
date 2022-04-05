import React, { useRef } from 'react';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Fab
} from '@mui/material';
import axios from 'axios';
import DataGrid, { ColumnChooser, ColumnFixing, Paging, Pager } from 'devextreme-react/data-grid';
import { Upload } from '@mui/icons-material';
import { connect } from 'react-redux';
import UploadDocumentColumn from '../upload-document-column';
import {
  uploadDocument,
  uploadDocumentSuccess,
  uploadDocumentFailure,
} from '../../state/actions/document';
import { UserState } from '../../state/reducers/user';
import { changeStep } from '../../state/actions/step-progress';

interface UploadDocumentFormProps {
  dispatch: any;
  loading: boolean;
  activeStep: number;
  selectedDocument1: any;
  selectedDocument2: any;
  comparisonColumn1: string;
  comparisonColumn2: string;
  resultColumns1: string;
  resultColumns2: string;
  fileSource1: string;
  fileSource2: string;
  isFilePinned1: boolean;
  isFilePinned2: boolean;
  errorMessage: string;
  hasError: boolean;
  user: UserState;
}

const UploadDocumentForm = ({
  dispatch,
  loading,
  activeStep,
  selectedDocument1,
  selectedDocument2,
  comparisonColumn1,
  comparisonColumn2,
  resultColumns1,
  resultColumns2,
  fileSource1,
  fileSource2,
  isFilePinned1,
  isFilePinned2,
  errorMessage,
  hasError,
  user
}: UploadDocumentFormProps) => {
  const dataGrid1 = useRef<any>(null);
  const dataGrid2 = useRef<any>(null);
  /**
   * Puts the selected file and column name into a FormData instance,
   * sends it to the server, and then changes to the next step where
   * the duplicates will be displayed
   */
  const handleUpload = () => {
    const formData = new FormData();
    if (
      selectedDocument1 &&
      selectedDocument1.name &&
      fileSource1 === 'upload'
    ) {
      formData.append(
        "sales_file1",
        selectedDocument1,
        selectedDocument1.name
      );
    }

    if (
      selectedDocument2 &&
      selectedDocument2.name &&
      fileSource2 === 'upload'
    ) {
      formData.append(
        "sales_file2",
        selectedDocument2,
        selectedDocument2.name
      );
    }
    if (fileSource1 === 'pinned' || fileSource2 === 'pinned') {
      formData.append('pinnedFilename', user.pinnedFile);
      formData.append('pinnedFileIndex', fileSource1 === 'pinned' ? '0' : '1')
    }
    let visibleColumns1;
    let visibleColumns2;
    if (dataGrid1 && dataGrid1.current && dataGrid1.current.instance) {
      console.log('datagrid instance current getting cols', dataGrid1, dataGrid1.current.instance.getVisibleColumns());
      visibleColumns1 = dataGrid1.current.instance.getVisibleColumns().map((col: any) => col.dataSource);
      console.log('visible cols 1', visibleColumns1);
    }
    if (dataGrid1 && dataGrid2.current && dataGrid2.current.instance) {
      console.log('datagrid instance current getting cols', dataGrid2, dataGrid2.current.instance.getVisibleColumns());
      visibleColumns2 = dataGrid2.current.instance.getVisibleColumns().map((col: any) => col.dataSource);;
      console.log('visible cols 2', visibleColumns2);
    }
    formData.append('comparisonColumn1', comparisonColumn1);
    formData.append('comparisonColumn2', comparisonColumn2);
    formData.append('resultColumns1', visibleColumns1);
    formData.append('resultColumns2', visibleColumns2);

    dispatch(uploadDocument());
    axios.post('http://localhost:3001/api/v1/uploadfile', formData)
      .then((res) => {
        dispatch(uploadDocumentSuccess(res.data));
        dispatch(changeStep(activeStep += 1));
      })
      .catch((err: any) => dispatch(uploadDocumentFailure(err.message)));
  };

  // const isSubmitBtnEnabled = ((fileSource1 === 'pinned' && user.pinnedFile && selectedDocument2) ||
  //   (fileSource2 === 'pinned' && user.pinnedFile && selectedDocument1) ||
  //   (selectedDocument1 && selectedDocument2 && fileSource1 === 'upload' && fileSource2 === 'upload')) &&
  //   (comparisonColumn1 && comparisonColumn2 && resultColumns1 && resultColumns2);

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
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
            resultColumns={resultColumns1}
            selectedDocument={selectedDocument1}
            fileSource={fileSource1}
            isFilePinned={isFilePinned1}
            otherColumnUsingPinned={fileSource2 === 'pinned'}
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
              <ColumnChooser enabled={true} height={200} />
              <ColumnFixing enabled={true} />
              <Paging defaultPageSize={5} />
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
            resultColumns={resultColumns2}
            selectedDocument={selectedDocument2}
            fileSource={fileSource2}
            isFilePinned={isFilePinned2}
            otherColumnUsingPinned={fileSource1 === 'pinned'}
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
              <ColumnChooser enabled={true} height={200} />
              <ColumnFixing enabled={true} />
              <Paging defaultPageSize={5} />
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
            // disabled={!isSubmitBtnEnabled}
            onClick={handleUpload}
          >
            <Upload sx={{ mr: 1 }} />
            Upload and Compare
          </Fab>
        </Grid>
      </Grid>

      {hasError &&
        <Alert
          severity="error"
          variant="standard"
          sx={{ marginTop: '2rem', borderRadius: '10px', width: '100%' }}
        >
          {errorMessage}
        </Alert>
      }

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  selectedDocument1: state.document.selectedDocument1,
  selectedDocument2: state.document.selectedDocument2,
  comparisonColumn1: state.document.comparisonColumn1,
  comparisonColumn2: state.document.comparisonColumn2,
  resultColumns1: state.document.resultColumns1,
  resultColumns2: state.document.resultColumns2,
  fileSource1: state.document.fileSource1,
  fileSource2: state.document.fileSource2,
  isFilePinned1: state.document.isFilePinned1,
  isFilePinned2: state.document.isFilePinned2,
  errorMessage: state.document.errorMessage,
  hasError: state.document.hasError,
  loading: state.document.loading,
  user: state.user
});

export default connect(mapStateToProps)(UploadDocumentForm);