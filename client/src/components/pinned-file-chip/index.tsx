import React from 'react';
import {
  Typography,
  Chip,
} from '@mui/material';
import { Attachment } from '@mui/icons-material';
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState;
  handlePinnedFileClick: any;
}

const PinnedFileChip = ({ user, handlePinnedFileClick }: Props) => {
  return (
    <>
      <Typography variant="subtitle1">Pinned File:</Typography>
      <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFileName} />
    </>
  );
}

export default PinnedFileChip;