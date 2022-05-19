import React from 'react';
import { connect } from 'react-redux';
import DuplicatesTable from '../../components/duplicates-table';
import { UserState } from '../../state/reducers/user';

interface Props {
  duplicatesData: Array<any>;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
  fileStructure1: string;
  fileStructure2: string;
  partnerName: string;
  partnerCompany: string;
  user: UserState;
}

const DuplicatesTableContainer = ({
  duplicatesData,
  comparisonColumns1,
  comparisonColumns2,
  fileStructure1,
  fileStructure2,
  partnerName,
  partnerCompany,
  user
}: Props) => {
  return (
    <DuplicatesTable
      duplicatesData={duplicatesData}
      comparisonColumns1={comparisonColumns1}
      comparisonColumns2={comparisonColumns2}
      fileStructure1={fileStructure1}
      fileStructure2={fileStructure2}
      partnerName={partnerName}
      partnerCompany={partnerCompany}
      user={user}
    />
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData,
  comparisonColumns1: state.document.comparisonColumns1,
  comparisonColumns2: state.document.comparisonColumns2,
  fileStructure1: state.document.fileStructure1,
  fileStructure2: state.document.fileStructure2,
  partnerName: state.document.partnerName,
  partnerCompany: state.document.partnerCompany,
  user: state.user
});

export default connect(mapStateToProps)(DuplicatesTableContainer);