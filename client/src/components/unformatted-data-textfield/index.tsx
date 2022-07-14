import React, { useState } from 'react';
import UnformattedPinnedFileModalContainer from '../../containers/unformatted-pinned-file-modal';
import { IconButton, TextField } from '@mui/material';
import { PushPin } from '@mui/icons-material';

interface Props {
  unformattedData: string;
  handleUnformattedDataChange: any;
}

const UnformattedDataTextField = ({
  unformattedData,
  handleUnformattedDataChange
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TextField
        multiline
        maxRows={5}
        variant="standard"
        sx={{ width: '100%' }}
        helperText="Unformatted data"
        value={unformattedData}
        onChange={handleUnformattedDataChange}
      />
      <IconButton
        sx={{ margin: '0.5rem' }}
        onClick={() => setIsModalOpen(true)}
        // disabled={user.pinnedFileName === selectedDocument.name}
      >
        <PushPin />
      </IconButton>
      {isModalOpen && <UnformattedPinnedFileModalContainer isOpen={isModalOpen} handleClose={handleClose} />}
    </>
  );
}

export default UnformattedDataTextField;