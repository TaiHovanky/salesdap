import React, { useState } from 'react';
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@mui/material';
import { Help } from '@mui/icons-material';
import DataGrid, { Column } from 'devextreme-react/data-grid';

interface Props {
  fileStructure: string;
  handleFileStructureChange: any;
  index: number;
}

const structuredData = [
  { 'Account Name': 'Pepsi Co.', Website: 'pepsi.com', 'Account Manager': 'Thomas Henry', DUNS: 123453 },
  { 'Account Name': 'Tropicana', Website: 'tropicana.com', 'Account Manager': 'Jennifer Shaw', DUNS: 345234 },
  { 'Account Name': 'Gatorade', Website: 'gatorade.com', 'Account Manager': 'Kim Yi', DUNS: 645345 }
];

const unstructuredData = [
  'Pepsi Co.',
  'Tropicana',
  'Gatorade'
];

interface Props {
  handleFileStructureChange: any;
  index: number;
  fileStructure: string;
}

const FileStructureRadio = ({ fileStructure, handleFileStructureChange, index }: Props) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleOpenHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen);
  }

  return (
    <>
      <FormControl>
        <FormLabel>Is your data structured or unstructured? <IconButton onClick={handleOpenHelpModal}><Help /></IconButton></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={fileStructure}
          onChange={(event: any) => handleFileStructureChange(event, index)}
          sx={{ marginBottom: '1rem' }}
        >
          <FormControlLabel value="structured" control={<Radio />} label="Structured" />
          <FormControlLabel value="unstructured" control={<Radio />} label="Unstructured" />
        </RadioGroup>
      </FormControl>
      <Dialog
        open={isHelpModalOpen}
        onClose={handleOpenHelpModal}
      >
        <DialogTitle>Structured vs. Unstructured Data</DialogTitle>
        <DialogContent dividers={true}>
        <DialogContentText>Structured data example:</DialogContentText>
        <DataGrid
          id="structuredGridContainer"
          dataSource={structuredData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        />
        <Typography variant="body2">Note that "structured" here is referring to the presence of defined column
        names.</Typography>
        <DialogContentText sx={{ marginTop: '1.5rem' }}>Unstructured data example:</DialogContentText>
        <DataGrid 
          id="unstructuredGridContainer"
          dataSource={unstructuredData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        >
          <Column caption="" calculateCellValue={(data: any) => data} />
        </DataGrid>
        <Typography variant="body2">Note that "unstructured" here is referring to the lack of defined column
        names. If you're uploading an unstructured file, only copy/paste 1 column that you think would lead to the most
        precise match when mapped to a column from the other file.</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FileStructureRadio;