import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

interface Props {
  selectedPinnedFileId: string;
  handlePinnedFileSelection: any;
  pinnedFiles: Array<any>;
}

const PinnedFileDropdown = ({
  selectedPinnedFileId,
  handlePinnedFileSelection,
  pinnedFiles,
}: Props) => {
  return (
    <FormControl fullWidth size="medium" sx={{ margin: '0.5rem auto 0' }}>
      <InputLabel id="demo-simple-select-standard-label">Select Pinned File</InputLabel>
      <Select
        id="pinned-file-selection"
        value={selectedPinnedFileId}
        onChange={handlePinnedFileSelection}
        label="Select Pinned File *"
      >
        {pinnedFiles.map((file: any, index: number) => (
          <MenuItem value={file.pinned_file_id} key={`pinned-file-${index}`}>
            {file.file_label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PinnedFileDropdown;