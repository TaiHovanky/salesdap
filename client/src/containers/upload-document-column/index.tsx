import React from 'react';
import { connect } from 'react-redux';
import { UserState } from '../../state/reducers/user';
import UploadDocumentColumn from '../../components/upload-document-column';

interface Props {
  user: UserState;
  selectedDocument: any;
  comparisonColumns: Array<string>;
  fileSource: string;
  index: number;
}

const UploadDocumentColumnContainer = ({
  user,
  selectedDocument,
  comparisonColumns,
  fileSource,
  index
}: Props) => {
  return (
    <UploadDocumentColumn
      selectedDocument={selectedDocument}
      comparisonColumns={comparisonColumns}
      fileSource={fileSource}
      user={user}
      index={index}
    />
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(UploadDocumentColumnContainer);