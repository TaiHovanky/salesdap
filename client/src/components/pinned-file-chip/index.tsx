import React from 'react';
import {
  Typography,
  Chip,
} from '@mui/material';
import { Attachment } from '@mui/icons-material';
import {
  createFileLink,
  getPinnedFile
} from '../../utils/spreadsheet.utils';
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState;
}

const PinnedFileChip = ({ user }: Props) => {
  const handlePinnedFileClick = async () => {
    try {
      const pinnedFileData = await getPinnedFile(user.pinnedFileId);
      createFileLink(pinnedFileData.data, user.pinnedFileName);
    } catch (err: any) {
      console.log('err', err);
    }
  };

  return (
    <>
      <Typography variant="subtitle1">Pinned File:</Typography>
      <Chip onClick={handlePinnedFileClick} icon={<Attachment />} label={user.pinnedFileName} />
    </>
  );
}

export default PinnedFileChip;