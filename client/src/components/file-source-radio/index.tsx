import React from 'react';
import {
  FormControlLabel,
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
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={fileSource}
        onChange={(event: any) => handleFileTypeChange(event, index)}
        sx={{ marginBottom: '1rem' }}
      >
        <FormControlLabel value="upload" control={<Radio />} label="Upload a file" />
        <FormControlLabel value="pinned" control={<Radio />} label="Use your pinned file" />
      </RadioGroup>
    </FormControl>
  );
}

export default FileSourceRadio;