import React, { useRef, ChangeEvent } from 'react';
import {
  Grid,
  TextField,
  Fab
} from '@mui/material';
import { Download, ContentCopy } from '@mui/icons-material';
import { connect } from 'react-redux';
import { downloadSpreadsheetFromJSON } from '../../utils/spreadsheet.utils';
import { updateEmailTemplate } from '../../state/actions/email-template';

interface Props {
  duplicatesData: Array<any>;
  template: string;
  dispatch: any;
}

const EmailTemplate = ({ duplicatesData, template, dispatch }: Props) => {
  const textAreaRef = useRef<any>(null);

  const handleTemplateChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmailTemplate(event.target.value));
  }

  const handleResultsDownload = () => {
    downloadSpreadsheetFromJSON(duplicatesData);
  }

  const handleCopyEmailTemplate = async (event: any) => {
    try {
      await navigator.clipboard.writeText(template);
      console.log('Page URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%', width: '100%', marginTop: '3.5rem' }}
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
        <TextField
          id="email-template-multiline"
          label="Modify and then Copy/Paste this email template"
          multiline
          ref={textAreaRef}
          rows={9}
          defaultValue={template}
          variant="filled"
          sx={{ width: '100%' }}
          onChange={handleTemplateChange}
        />
        <Fab
          variant="extended"
          aria-label="add"
          sx={{ marginTop: '2.5rem' }}
          onClick={handleCopyEmailTemplate}
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
  );
}

const mapStateToProps = (state: any) => ({
  duplicatesData: state.document.duplicatesData,
  template: state.emailTemplate.template
});

export default connect(mapStateToProps)(EmailTemplate);