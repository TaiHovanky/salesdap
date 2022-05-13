import React, { useState } from 'react';
import UploadDocumentColumnContainer from '../../containers/upload-document-column';
import ResultsPreviewModalContainer from '../../containers/results-preview-modal';
import { Grid, Fab } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { DocumentState } from '../../state/reducers/document';

interface UploadDocumentFormProps {
  document: DocumentState;
  setAllColumns: any;
  handleColumnClick: any;
  handleUploadAndCompare: any;
}

const UploadDocumentForm = ({
  document,
  setAllColumns,
  handleColumnClick,
  handleUploadAndCompare
}: UploadDocumentFormProps): any => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const {
    selectedDocument1,
    selectedDocument2,
    comparisonColumns1,
    comparisonColumns2,
    comparisonColumns1Error,
    comparisonColumns2Error,
    fileSource1,
    fileSource2,
    fileStructure1,
    fileStructure2,
    unstructuredData1,
    unstructuredData2
  } = document;

  const handleOpenPreview = () => {
    setIsPreviewModalOpen(true);
  }

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
  }

  /* Validation for whether the Submit button should be enabled or disabled. If documents
  and columns haven't been selected, the button should be disabled. */
  // const isSubmitBtnEnabled: boolean = selectedDocument1 && selectedDocument2 &&
  //   !!comparisonColumns1.length && !!comparisonColumns2.length &&
  //   !comparisonColumns1Error.length && !comparisonColumns2Error.length;

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
            setAllColumns={setAllColumns}
            handleColumnClick={handleColumnClick}
            fileStructure={fileStructure1}
            unstructuredData={unstructuredData1}
          />
          <UploadDocumentColumnContainer
            comparisonColumns={comparisonColumns2}
            comparisonColumnsError={comparisonColumns2Error}
            selectedDocument={selectedDocument2}
            fileSource={fileSource2}
            index={1}
            setAllColumns={setAllColumns}
            handleColumnClick={handleColumnClick}
            fileStructure={fileStructure2}
            unstructuredData={unstructuredData2}
          />
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
            // color="primary"
            aria-label="add"
            sx={{ marginTop: '2rem', marginBottom: '1.5rem' }}
            onClick={handleOpenPreview}
          >
            <Upload sx={{ mr: 1 }} />
            Preview Results
          </Fab>
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            // sx={{ marginTop: '2rem' }}
            // disabled={!isSubmitBtnEnabled}
            onClick={handleUploadAndCompare}
          >
            <Upload sx={{ mr: 1 }} />
            Upload and Compare
          </Fab>
        </Grid>
      </Grid>
      {isPreviewModalOpen && <ResultsPreviewModalContainer
        isPreviewModalOpen={isPreviewModalOpen}
        handleClosePreview={handleClosePreview}
      />}
    </>
  );
};

export default UploadDocumentForm;