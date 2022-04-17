import React, { SyntheticEvent } from 'react';
import {
  Fab,
  Typography,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Chip,
  TextField,
  Autocomplete,
  Grid
} from '@mui/material';

interface Props {
  selectedDocument: any;
  comparisonColumns: Array<string>;
  index: number;
}

const ComparisonColumnAutocomplete = ({ selectedDocument, comparisonColumns, index }: Props) => {
  const autocompleteOptions: Array<string> = selectedDocument && selectedDocument.data && selectedDocument.data[0] ?
    Array.from(Object.keys(selectedDocument.data[0])) :
    [];

  /**
   * As the user types in the Column field, update its value
   * @param event
   */
  //  const handleComparisonColumnFieldChange = (
  //   event: SyntheticEvent<Element, Event>,
  //   newValue: Array<string>
  // ) => {
  //   dispatch(changeComparisonColumn(newValue, index));
  // };

  return (
    <Autocomplete
      multiple={true}
      options={autocompleteOptions}
      onChange={(event, newValue) => changeComparisonColumn(event, newValue)}
      value={comparisonColumns}
      sx={{ width: '100%', margin: '1.5rem 0' }}
      renderInput={(params: any) => (<TextField
        {...params}
        variant="standard"
        helperText={`Columns from file ${index === 0 ? 'A' : 'B'} that will be compared with columns
        from file ${index === 0 ? 'B' : 'A'} to determine match. Limit: 3 columns. Hint: the more unique a column's value is
        to a company, the better (DUNS number, company website, etc.).`}
      />)}
    />
  );
}

export default ComparisonColumnAutocomplete;