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
        sx={{ width: '100%' }}
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
        />)}
      />
      {!!comparisonColumnsError.length && <Typography variant="caption" sx={{ color: '#d32f2f' }}>{comparisonColumnsError.join('\n')}</Typography>}
    </>
  );
}

export default ComparisonColumnAutocomplete;