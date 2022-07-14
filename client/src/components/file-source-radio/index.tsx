import React from 'react';
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel
} from '@mui/material';

interface Props {
  fileSource: string;
  handleFileTypeChange: any;
  index: number;
}

const FileSourceRadio = ({
  fileSource,
  handleFileTypeChange,
  index
}: Props) => {
  return (
    <FormControl>
      {/* <IconButton onClick={handleOpenFileSourceHelpModal}><Help /></IconButton> */}
      <FormLabel sx={{ marginTop: '4rem', marginBottom: '0.25rem' }}>Do you want to upload a new file or use one of your pinned files?</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        row
        value={fileSource}
        onChange={(event: any) => handleFileTypeChange(event, index)}
        sx={{ margin: '0 auto' }}
      >
        <FormControlLabel value="upload" control={<Radio />} label="Upload a new file" />
        <FormControlLabel value="pinned" control={<Radio />} label="Use my pinned file" />
      </RadioGroup>
    </FormControl>
  );
}

export default FileSourceRadio;