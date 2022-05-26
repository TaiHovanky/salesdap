import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  partnerCompany: string;
  changePartnerCompany: any;
}

const PartnerCompanyTextfield = ({
  partnerCompany,
  changePartnerCompany
}: Props) => {
  return (
    <>
      <TextField
        helperText="Partner Company"
        variant="standard"
        sx={{ width: '100%' }}
        value={partnerCompany}
        onChange={changePartnerCompany}
      />
    </>
  );
}

export default PartnerCompanyTextfield;