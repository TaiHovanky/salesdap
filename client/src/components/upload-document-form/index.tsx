import React, { useState } from 'react';
import UploadDocumentColumnContainer from '../../containers/upload-document-column';
import ResultsPreviewModalContainer from '../../containers/results-preview-modal';
import { Grid, Fab, Divider } from '@mui/material';
import { Upload, Preview } from '@mui/icons-material';
import { DocumentState } from '../../state/reducers/document';
import { isSubmitButtonEnabled } from '../../utils/duplicates-table.utils';
import { FREE_COMPARISONS_LIMIT, PREMIUM } from '../../state/reducers/user';
import InfoTooltip from '../info-tooltip';

interface UploadDocumentFormProps {
  document: DocumentState;
  setAllColumns: any;
  handleColumnClick: any;
  handleUploadAndCompare: any;
  userFreeComparisons: number;
  userSubscriptionType: string;
}

const UploadDocumentForm = ({
  document,
  setAllColumns,
  handleColumnClick,
  handleUploadAndCompare,
  userFreeComparisons,
  userSubscriptionType
}: UploadDocumentFormProps): any => {
  /* For the preview modal, we use local state because we don't need its open state to be
  persisted when a user goes to another step */
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
    unformattedData1,
    unformattedData2
  } = document;

  const handleOpenPreview = () => {
    setIsPreviewModalOpen(true);
  }

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
  }

  /* Validation for whether the Submit button should be enabled or disabled. If documents
  and columns haven't been selected, the button should be disabled. */
  const isSubmitBtnEnabled: boolean = isSubmitButtonEnabled(
    fileStructure1,
    fileStructure2,
    comparisonColumns1,
    comparisonColumns2,
    unformattedData1,
    unformattedData2,
    selectedDocument1,
    selectedDocument2,
    userFreeComparisons,
    userSubscriptionType
  );

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
            unformattedData={unformattedData1}
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
            unformattedData={unformattedData2}
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
            aria-label="add"
            sx={{ marginTop: '2rem', marginBottom: '1.5rem' }}
            onClick={handleOpenPreview}
          >
            <Preview sx={{ mr: 1 }} />
            Preview Results
          </Fab>
          <InfoTooltip
            arrow
            open={userSubscriptionType !== PREMIUM && userFreeComparisons >= FREE_COMPARISONS_LIMIT}
            title={`You've used the ${FREE_COMPARISONS_LIMIT} free comparisons.
            For an unlimited amount of comparisons, upgrade your subscription in your profile page.`}
          >
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              disabled={!isSubmitBtnEnabled}
              onClick={handleUploadAndCompare}
            >
              <Upload sx={{ mr: 1 }} />
              Upload and Compare
            </Fab>
          </InfoTooltip>
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