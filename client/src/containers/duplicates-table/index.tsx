import React from 'react';
import { connect } from 'react-redux';
import DuplicatesTable from '../../components/duplicates-table';

interface Props {
  duplicatesData: Array<any>;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
}

const DuplicatesTableContainer = ({ duplicatesData, comparisonColumns1, comparisonColumns2 }: Props) => {
  return (
    <DuplicatesTable
      duplicatesData={duplicatesData}
      comparisonColumns1={comparisonColumns1}
      comparisonColumns2={comparisonColumns2}
    />
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData,
  comparisonColumns1: state.document.comparisonColumns1,
  comparisonColumns2: state.document.comparisonColumns2
});

export default connect(mapStateToProps)(DuplicatesTableContainer);