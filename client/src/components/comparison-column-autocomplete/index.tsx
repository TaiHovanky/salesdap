import React from 'react';
import { TextField, Autocomplete, Typography, Checkbox } from '@mui/material';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

interface Props {
  selectedDocument: any;
  comparisonColumns: Array<string>;
  comparisonColumnsError: Array<string>;
  handleComparisonColumnsBlur: any;
  handleComparisonColumnFieldChange: any;
  index: number;
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const ComparisonColumnAutocomplete = ({
  selectedDocument,
  comparisonColumns,
  comparisonColumnsError,
  handleComparisonColumnsBlur,
  handleComparisonColumnFieldChange,
  index
}: Props) => {
  const autocompleteOptions: Array<string> = selectedDocument && selectedDocument.data && selectedDocument.data[0] ?
    Array.from(Object.keys(selectedDocument.data[0])) :
    [];

  return (
    <>
      <Autocomplete
        multiple={true}
        disableCloseOnSelect={true}
        options={autocompleteOptions}
        onChange={handleComparisonColumnFieldChange}
        value={comparisonColumns}
        sx={{ width: '100%', margin: '2.5rem 0 1.5rem 0' }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params: any) => (<TextField
          {...params}
          variant="standard"
          required={true}
          error={!!comparisonColumnsError.length}
          onBlur={handleComparisonColumnsBlur}
          helperText={`Columns from file ${index === 0 ? 'A' : 'B'} that will be compared with columns
          from file ${index === 0 ? 'B' : 'A'} to determine match. Limit: 3 columns. Hint: the more unique a column's value is
          to a company, the better (DUNS number, company website, etc.).`}
        />)}
      />
      {!!comparisonColumnsError.length && <Typography variant="caption" sx={{ color: '#d32f2f' }}>{comparisonColumnsError.join('\n')}</Typography>}
    </>
  );
}

export default ComparisonColumnAutocomplete;