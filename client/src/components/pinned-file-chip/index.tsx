import React from 'react';
import { Typography, Chip } from '@mui/material';
import { Attachment } from '@mui/icons-material';

interface Props {
  handlePinnedFileClick: any;
  fileName?: string;
}

const PinnedFileChip = ({ fileName, handlePinnedFileClick }: Props) => {
  return (
    <>
      <Typography variant="subtitle1">Pinned File:</Typography>
      <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={fileName} />
    </>
  );
}

export default PinnedFileChip;