import React, { useState } from 'react';
import UnformattedPinnedFileModalContainer from '../../containers/unformatted-pinned-file-modal';
import { IconButton, TextField, FormLabel, Tooltip } from '@mui/material';
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
      <FormLabel sx={{ marginBottom: '0.25rem' }}>
        Copy and Paste unformatted data <Tooltip title="Pin a list for future comparisons" arrow>
            <IconButton sx={{ margin: '0.5rem' }} onClick={() => setIsModalOpen(true)}><PushPin /></IconButton>
          </Tooltip>
      </FormLabel>
      <TextField
        multiline
        maxRows={5}
        variant="standard"
        sx={{ width: '100%' }}
        helperText="Unformatted data"
        value={unformattedData}
        onChange={handleUnformattedDataChange}
      />
      {isModalOpen && <UnformattedPinnedFileModalContainer isOpen={isModalOpen} handleClose={handleClose} />}
    </>
  );
}

export default UnformattedDataTextField;