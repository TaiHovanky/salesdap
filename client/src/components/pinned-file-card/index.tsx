import React, { useRef, useState } from 'react';
import { AttachFile, Attachment, PushPin, Upload, Add, Folder, Edit } from '@mui/icons-material';
import {
  Fab,
  Grid,
  IconButton,
  Tooltip,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Chip,
  Divider,
} from '@mui/material';
import InfoTooltip from '../info-tooltip';
import EditPinnedFileModal from '../edit-pinned-file-modal';

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const PinnedFileCard = ({ handlePinnedFileClick, pinnedFiles }: any) => {
  // const [pinnedFileLabel, setPinnedFileLabel] = useState('');
  // const inputFileRef: any = useRef(null);

  // const handleFileSelectionBtnClick = () => {
  //   /*Collecting node-element and performing click*/
  //   if (inputFileRef&& inputFileRef.current) {
  //     inputFileRef.current.click();
  //   }
  // };

  // const handlePinnedFileLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPinnedFileLabel(e.target.value);
  // }

  // const handlePinnedFileClick = () => {
  //   return;
  // }
  console.log('pinned files', pinnedFiles)
  const [isOpen, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={6}>
      <EditPinnedFileModal isOpen={isOpen} handleClose={handleClose} />
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Pinned Files <IconButton edge="end" onClick={handleClickOpen}><Add /></IconButton>
      </Typography>
      <div>
        <List dense={true}>
          {pinnedFiles.map((file: any, key: number) => (
            <div key={key}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
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
    // <Card sx={{ maxWidth: 345, marginBottom: '2rem' }}>
    //   <CardActionArea>

    //     <CardContent>
    //       <Typography gutterBottom variant="h6" component="div">
    //         {pinnedFile.label || 'Pinned File'}
    //       </Typography>
    //       <Grid
    //         item
    //         container
    //         xs={12}
    //         p={1}
    //         direction="column"
    //         justifyContent="start"
    //         alignItems="start"
    //       >
    //         <Chip
    //           onClick={handlePinnedFileClick}
    //           icon={<Attachment />}
    //           label={pinnedFile.pinned_filename}
    //           sx={{ marginBottom: '1.5rem' }}
    //         />
    //       </Grid>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
  );
};

export default PinnedFileCard;