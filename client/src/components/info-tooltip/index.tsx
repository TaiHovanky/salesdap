import React from 'react';
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

const InfoTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: theme.typography.pxToRem(18),
  },
}));

export default InfoTooltip;