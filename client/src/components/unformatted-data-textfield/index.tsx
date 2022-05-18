import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  unformattedData: string;
  handleUnformattedDataChange: any;
}

const UnformattedDataTextField = ({
  unformattedData,
  handleUnformattedDataChange
}: Props) => {
  return (
    <TextField
      multiline
      variant="standard"
      helperText="Copy and Paste unformatted data here"
      value={unformattedData}
      onChange={handleUnformattedDataChange}
    />
  );
}

export default UnformattedDataTextField;