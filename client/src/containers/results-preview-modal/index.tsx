import React from 'react';
import { connect } from 'react-redux';
import ResultsPreviewModal from '../../components/results-preview-modal';

interface Props {
  isPreviewModalOpen: boolean;
  handleClosePreview: any;
  selectedDocument1: any;
  selectedDocument2: any;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
}

const ResultsPreviewModalContainer = ({
  isPreviewModalOpen,
  handleClosePreview,
  selectedDocument1,
  selectedDocument2,
  comparisonColumns1,
  comparisonColumns2
}: Props) => {
  return (
    <ResultsPreviewModal
      isPreviewModalOpen={isPreviewModalOpen}
      handleClosePreview={handleClosePreview}
      selectedDocument1={selectedDocument1}
      selectedDocument2={selectedDocument2}
      comparisonColumns1={comparisonColumns1}
      comparisonColumns2={comparisonColumns2}
    />
  );
}

const mapStateToProps = (state: any) => ({
  selectedDocument1: state.document.selectedDocument1,
  selectedDocument2: state.document.selectedDocument2,
  comparisonColumns1: state.document.comparisonColumns1,
  comparisonColumns2: state.document.comparisonColumns2
});

export default connect(mapStateToProps)(ResultsPreviewModalContainer);