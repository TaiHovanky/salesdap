import React from 'react';
import ComparisonColumnAutocomplete from '../../components/comparison-column-autocomplete';
import { connect } from 'react-redux';
import { changeComparisonColumn, setComparisonColumnsError } from '../../state/actions/document';

interface Props {
  selectedDocument: any;
  comparisonColumns: Array<string>;
  changeComparisonColumn: any;
  comparisonColumnsError: string;
  setComparisonColumnsError: any;
  index: number;
}

const ComparisonColumnAutocompleteContainer = ({
  selectedDocument,
  comparisonColumns,
  changeComparisonColumn,
  comparisonColumnsError,
  setComparisonColumnsError,
  index
}: Props) => {
  const handleComparisonColumnFieldChange = (_: any, newValue: Array<string>) => {
    changeComparisonColumn(newValue, index);
    setComparisonColumnsError(newValue, index)
  };

  const handleComparisonColumnsBlur = (event: any, x: any, y: any) => {
    console.log('blur', x, y, event);
    setComparisonColumnsError(event.target.outerText, index)
  };

  return (
    <ComparisonColumnAutocomplete
      selectedDocument={selectedDocument}
      comparisonColumns={comparisonColumns}
      comparisonColumnsError={comparisonColumnsError}
      handleComparisonColumnsBlur={handleComparisonColumnsBlur}
      handleComparisonColumnFieldChange={handleComparisonColumnFieldChange}
      index={index}
    />
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  changeComparisonColumn: (newValue: Array<string>, index: number) => dispatch(changeComparisonColumn(newValue, index)),
  setComparisonColumnsError: (newValue: Array<string>, index: number) => dispatch(setComparisonColumnsError(newValue, index))
});

export default connect(null, mapDispatchToProps)(ComparisonColumnAutocompleteContainer);