import React from 'react';
import { connect } from 'react-redux';
import ResultsPreviewModal from '../../components/results-preview-modal';
import { DocumentState } from '../../state/reducers/document';

interface Props {
  isPreviewModalOpen: boolean;
  handleClosePreview: any;
  document: DocumentState;
}

const ResultsPreviewModalContainer = ({
  isPreviewModalOpen,
  handleClosePreview,
  document
}: Props) => {
  return (
    <ResultsPreviewModal
      isPreviewModalOpen={isPreviewModalOpen}
      handleClosePreview={handleClosePreview}
      document={document}
    />
  );
}

const mapStateToProps = (state: any) => ({
  document: state.document
});

export default connect(mapStateToProps)(ResultsPreviewModalContainer);