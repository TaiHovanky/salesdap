import React from 'react';
import { connect } from 'react-redux';
import DuplicatesTable from '../../components/duplicates-table';

const DuplicatesTableContainer = ({ duplicatesData }: any) => {
  return (
    <DuplicatesTable duplicatesData={duplicatesData} />
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData
});

export default connect(mapStateToProps)(DuplicatesTableContainer);