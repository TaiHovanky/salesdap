import React from 'react';
import ComparisonColumnAutocomplete from '../../components/comparison-column-autocomplete';
import { connect } from 'react-redux';
import { changeComparisonColumn } from '../../state/actions/document';

interface Props {
  selectedDocument: any;
  comparisonColumns: Array<string>;
  changeComparisonColumn: any;
  index: number;
}

const ComparisonColumnAutocompleteContainer = ({
  selectedDocument,
  comparisonColumns,
  changeComparisonColumn,
  index
}: Props) => {
  return (
    <ComparisonColumnAutocomplete
      selectedDocument={selectedDocument}
      comparisonColumns={comparisonColumns}
      changeComparisonColumn={changeComparisonColumn}
      index={index}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  changeComparisonColumn: (_: any, newValue: Array<string>, index: number) => dispatch(changeComparisonColumn(newValue, index))
});

export default connect(null, mapDispatchToProps)(ComparisonColumnAutocompleteContainer);