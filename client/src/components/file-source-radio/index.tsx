import React from 'react';
import {
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup
} from '@mui/material';

interface Props {
  fileSource: string;
  handleFileTypeChange: any;
  index: number;
}

const FileSourceRadio = ({ fileSource, handleFileTypeChange, index }: Props) => {
  return (
    <FormControl>
      <FormLabel>File source?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        row
        value={fileSource}
        onChange={(event: any) => handleFileTypeChange(event, index)}
        sx={{ marginBottom: '2rem' }}
      >
        <FormControlLabel value="upload" control={<Radio />} label="Upload a file" />
        <FormControlLabel value="pinned" control={<Radio />} label="Use your pinned file" />
      </RadioGroup>
    </FormControl>
  );
}

export default FileSourceRadio;