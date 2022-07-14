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
import { FORMATTED_DATA, UNFORMATTED_DATA } from '../../state/actions/document';

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
        <FormLabel>Do you want to use a spreadsheet file or copy/paste a list of accounts? <IconButton onClick={handleOpenHelpModal}><Help /></IconButton></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={fileStructure}
          onChange={(event: any) => handleFileStructureChange(event, index)}
          sx={{ margin: '0 auto' }}
        >
          <FormControlLabel value={FORMATTED_DATA} control={<Radio />} label="Use a file" />
          <FormControlLabel value={UNFORMATTED_DATA} control={<Radio />} label="Copy/paste a list" />
        </RadioGroup>
      </FormControl>
      <FileStructureHelpModal isHelpModalOpen={isHelpModalOpen} handleOpenHelpModal={handleOpenHelpModal} />
    </>
  );
}

export default FileStructureRadio;