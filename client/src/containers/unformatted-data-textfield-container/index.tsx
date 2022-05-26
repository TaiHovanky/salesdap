import React from 'react';
import { connect } from 'react-redux';
import UnformattedDataTextField from '../../components/unformatted-data-textfield';
import { changeUnformattedData } from '../../state/actions/document';

interface Props {
  unformattedData: string;
  index: number;
  changeUnformattedData: any;
}

const UnformattedDataTextFieldContainer = ({
  unformattedData,
  index,
  changeUnformattedData
}: Props) => {
  const handleUnformattedDataChange = (event: any) => {
    changeUnformattedData(index, event.target.value);
  }

  return (
    <UnformattedDataTextField
      handleUnformattedDataChange={handleUnformattedDataChange}
      unformattedData={unformattedData}
    />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  changeUnformattedData: (index: number, value: string) => dispatch(changeUnformattedData(index, value))
});

export default connect(null, mapDispatchToProps)(UnformattedDataTextFieldContainer)