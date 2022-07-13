import React, { useRef, useState } from 'react';
import { Add, Folder, Edit } from '@mui/icons-material';
import {
  Grid,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import EditPinnedFileModalContainer from '../../containers/edit-pinned-file-modal';

const PinnedFileCard = ({ handlePinnedFileClick, pinnedFiles }: any) => {

  const [isOpen, setOpen] = useState(false);
  const [selectedExistingPinnedFile, setSelectedExistingPinnedFile] = useState<any>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExistingPinnedFile(null);
  };

  const handleEditButtonClick = (file: any) => {
    setOpen(true);
    setSelectedExistingPinnedFile(file);
  }

  return (
    <Grid item xs={12} md={6}>
      {isOpen && <EditPinnedFileModalContainer
        isOpen={isOpen}
        handleClose={handleClose}
        existingPinnedFile={selectedExistingPinnedFile}
      />}
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Pinned Files <IconButton edge="end" onClick={handleClickOpen}><Add /></IconButton>
      </Typography>
      <div>
        <List dense={true}>
          {pinnedFiles.map((file: any, key: number) => (
            <div key={key}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditButtonClick(file)}>
                    <Edit />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <Folder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.file_label}
                  secondary={file.file_name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      </div>
    </Grid>
  );
};

export default PinnedFileCard;