import React from 'react';
import { connect } from 'react-redux';
import DuplicatesTable from '../../components/duplicates-table';
import { UserState } from '../../state/reducers/user';

interface Props {
  duplicatesData: Array<any>;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
  user: UserState;
}

const DuplicatesTableContainer = ({
  duplicatesData,
  comparisonColumns1,
  comparisonColumns2,
  user
}: Props) => {
  return (
    <DuplicatesTable
      duplicatesData={duplicatesData}
      comparisonColumns1={comparisonColumns1}
      comparisonColumns2={comparisonColumns2}
      user={user}
    />
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData,
  comparisonColumns1: state.document.comparisonColumns1,
  comparisonColumns2: state.document.comparisonColumns2,
  user: state.user
});

export default connect(mapStateToProps)(DuplicatesTableContainer);