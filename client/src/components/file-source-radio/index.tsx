import React from 'react';
import {
  FormControlLabel,
  FormControl,
  Radio,
  Select,
  RadioGroup,
  MenuItem,
  InputLabel
} from '@mui/material';

interface Props {
  fileSource: string;
  selectedPinnedFileId: string;
  handleFileTypeChange: any;
  handlePinnedFileSelection: any;
  pinnedFiles: Array<any>;
  index: number;
}

const FileSourceRadio = ({ // to do: separate out to dropdown and radio components
  fileSource,
  selectedPinnedFileId,
  handleFileTypeChange,
  handlePinnedFileSelection,
  pinnedFiles,
  index
}: Props) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        row
        value={fileSource}
        onChange={(event: any) => handleFileTypeChange(event, index)}
        sx={{ marginBottom: '3rem' }}
      >
        <FormControlLabel value="upload" control={<Radio />} label="Upload a file" />
        <FormControlLabel value="pinned" control={<Radio />} label="Use your pinned file" />
      </RadioGroup>
      {fileSource === 'pinned' &&
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">Select Pinned File</InputLabel>
          <Select
            id="pinned-file-selection"
            value={selectedPinnedFileId}
            onChange={handlePinnedFileSelection}
            label="Select Pinned File"
          >
            {pinnedFiles.map((file: any, index: number) => (
              <MenuItem
                value={file.pinned_file_id}
                key={`pinned-file-${index}`}
                // name={file.file_name}
              >
                {file.file_label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    </FormControl>
  );
}

export default FileSourceRadio;