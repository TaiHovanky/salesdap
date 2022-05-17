import React, { useState } from 'react';
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  IconButton
} from '@mui/material';
import { Help } from '@mui/icons-material';
import FileStructureHelpModal from '../file-structure-help-modal';

interface Props {
  fileStructure: string;
  handleFileStructureChange: any;
  index: number;
}

const FileStructureRadio = ({ fileStructure, handleFileStructureChange, index }: Props) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleOpenHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  }

  return (
    <>
      <FormControl>
        <FormLabel>Is your data structured or unstructured? <IconButton onClick={handleOpenHelpModal}><Help /></IconButton></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={fileStructure}
          onChange={(event: any) => handleFileStructureChange(event, index)}
          sx={{ marginBottom: '1rem' }}
        >
          <FormControlLabel value="structured" control={<Radio />} label="Structured" />
          <FormControlLabel value="unstructured" control={<Radio />} label="Unstructured" />
        </RadioGroup>
      </FormControl>
      <FileStructureHelpModal isHelpModalOpen={isHelpModalOpen} handleOpenHelpModal={handleOpenHelpModal} />
    </>
  );
}

export default FileStructureRadio;