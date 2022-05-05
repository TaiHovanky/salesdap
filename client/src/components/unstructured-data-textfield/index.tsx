import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  unstructuredData: string;
  handleUnstructuredDataChange: any;
}

const UnstructuredDataTextField = ({
  unstructuredData,
  handleUnstructuredDataChange
}: Props) => {
  return (
    <TextField
      multiline
      variant="standard"
      helperText="Copy and Paste unstructured data here"
      value={unstructuredData}
      onChange={handleUnstructuredDataChange}
    />
  );
}

export default UnstructuredDataTextField;