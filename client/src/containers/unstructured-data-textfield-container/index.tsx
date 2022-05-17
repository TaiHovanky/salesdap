import React from 'react';
import { connect } from 'react-redux';
import UnstructuredDataTextField from '../../components/unstructured-data-textfield';
import { changeUnstructuredData } from '../../state/actions/document';

interface Props {
  unstructuredData: string;
  index: number;
  changeUnstructuredData: any;
}

const UnstructuredDataTextFieldContainer = ({
  unstructuredData,
  index,
  changeUnstructuredData
}: Props) => {
  const handleUnstructuredDataChange = (event: any) => {
    changeUnstructuredData(index, event.target.value);
  }

  return (
    <UnstructuredDataTextField
      handleUnstructuredDataChange={handleUnstructuredDataChange}
      unstructuredData={unstructuredData}
    />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  changeUnstructuredData: (index: number, value: string) => dispatch(changeUnstructuredData(index, value))
});

export default connect(null, mapDispatchToProps)(UnstructuredDataTextFieldContainer)