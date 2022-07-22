import React from 'react';
import { Typography, Chip } from '@mui/material';
import { Attachment } from '@mui/icons-material';

interface Props {
  handlePinnedFileClick: any;
  fileName?: string;
  existingPinnedFile?: any;
}

const PinnedFileChip = ({ fileName, handlePinnedFileClick, existingPinnedFile }: Props) => {
  return (
    <>
      <Typography variant="subtitle1">Pinned File:</Typography>
      <Chip onClick={() => handlePinnedFileClick(existingPinnedFile)} icon={<Attachment />} label={fileName} />
    </>
  );
}

export default PinnedFileChip;