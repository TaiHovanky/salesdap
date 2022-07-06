import React, { useRef, useState } from 'react';
import { AttachFile, Attachment, PushPin, Upload } from '@mui/icons-material';
import {
  Fab,
  Grid,
  IconButton,
  Tooltip,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  TextField,
  Chip,
} from '@mui/material';
import InfoTooltip from '../info-tooltip';

const PinnedFileCard = ({ pinnedFile, handlePinnedFileClick }: any) => {
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

  return (
    <Card sx={{ maxWidth: 345, marginBottom: '2rem' }}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {pinnedFile.label || 'Pinned File'}
          </Typography>
          <Grid
            item
            container
            xs={12}
            p={1}
            direction="column"
            justifyContent="start"
            alignItems="start"
          >
            <Chip
              onClick={handlePinnedFileClick}
              icon={<Attachment />}
              label={pinnedFile.pinned_filename}
              sx={{ marginBottom: '1.5rem' }}
            />
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PinnedFileCard;