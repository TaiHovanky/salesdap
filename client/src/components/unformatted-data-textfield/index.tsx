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
      maxRows={5}
      variant="standard"
      value={unformattedData}
      onChange={handleUnformattedDataChange}
    />
  );
}

export default UnformattedDataTextField;