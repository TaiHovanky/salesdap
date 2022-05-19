import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  partnerName: string;
  changePartnerName: any;
}

const PartnerNameTextfield = ({
  partnerName,
  changePartnerName
}: Props) => {
  return (
    <>
      <TextField
        helperText="Partner Sales Rep Name"
        variant="standard"
        sx={{ width: '100%', margin: '1rem 0' }}
        value={partnerName}
        onChange={changePartnerName}
      />
    </>
  );
}

export default PartnerNameTextfield;