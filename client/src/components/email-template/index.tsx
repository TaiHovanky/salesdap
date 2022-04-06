import React from 'react';
import {
  Grid,
  Box,
  TextField,
  Typography,
  Fab
} from '@mui/material';
import { Download, ContentCopy } from '@mui/icons-material';
import { connect } from 'react-redux';
import { downloadSpreadsheetFromJSON } from '../../utils/spreadsheet.utils';

const EMAIL_DEFAULT_TEXT = `[insert name],

Thanks for sending over your account list.

Attached you’ll find a list that maps both our account teams to one another. 

Regards,

[insert your signature]
`;

interface Props {
  duplicatesData: Array<any>;
}

const EmailTemplate = ({ duplicatesData }: Props) => {
  const handleResultsDownload = () => {
    downloadSpreadsheetFromJSON(duplicatesData);
  }

  return (
    <>
      <Box sx={{ width: '100%', height: '80vh', marginTop: '3.5vh' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%', width: '100%' }}
        >
          <Grid
            item
            container
            xs={8}
            sx={{ height: '100%', width: '100%' }}
            direction="column"
            justifyContent="start"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ marginTop: '3rem' }}>Click to copy email</Typography>
            <TextField
              id="email-template-multiline"
              label="Email Template"
              multiline
              rows={9}
              defaultValue={EMAIL_DEFAULT_TEXT}
              variant="filled"
              sx={{ width: '100%' }}
            />
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '2.5rem' }}
            >
              <ContentCopy sx={{ mr: 1 }} />
              Copy Template
            </Fab>
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ marginTop: '2.5rem' }}
              onClick={handleResultsDownload}
            >
              <Download sx={{ mr: 1 }} />
              Download Results
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData
});

export default connect(mapStateToProps)(EmailTemplate);