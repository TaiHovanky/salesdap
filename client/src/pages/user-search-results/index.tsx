import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';

interface Props {
  users: Array<any>;
}

const UserSearchResults = ({
  users
}: Props) => {
  return (
    <>
      <Box sx={{ width: '100%', marginTop: '3.5vh' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <Grid
            item
            container
            xs={6}
            sx={{ height: '100%' }}
            direction="column"
            justifyContent="center"
            // alignItems="center"
          >
            {users.map((user) => {
              
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserSearchResults;