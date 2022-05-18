import React from 'react';
import { connect } from 'react-redux';
import { UserState } from '../../state/reducers/user';
import UploadDocumentColumn from '../../components/upload-document-column';

interface Props {
  user: UserState;
  selectedDocument: any;
  comparisonColumns: Array<string>;
  comparisonColumnsError: Array<string>;
  fileSource: string;
  index: number;
  handleColumnClick: any;
  setAllColumns: any;
  fileStructure: string;
  unformattedData: string;
}

const UploadDocumentColumnContainer = ({
  user,
  selectedDocument,
  comparisonColumns,
  comparisonColumnsError,
  fileSource,
  index,
  handleColumnClick,
  setAllColumns,
  fileStructure,
  unformattedData
}: Props) => {
  return (
    <UploadDocumentColumn
      selectedDocument={selectedDocument}
      comparisonColumns={comparisonColumns}
      comparisonColumnsError={comparisonColumnsError}
      fileSource={fileSource}
      user={user}
      index={index}
      handleColumnClick={handleColumnClick}
      setAllColumns={setAllColumns}
      fileStructure={fileStructure}
      unformattedData={unformattedData}
    />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(UploadDocumentColumnContainer);