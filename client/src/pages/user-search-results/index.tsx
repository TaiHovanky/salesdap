import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material';

interface Props {
  users: Array<any>;
  handleUserCardClick: any;
}

const UserSearchResults = ({
  users,
  handleUserCardClick
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
            <Typography variant="h3">Search Results</Typography>
            {users.map((user: any, index: number) => {
              return (
                <Card sx={{ minWidth: 275, margin: '0.5rem 0' }} key={index}>
                  <CardActionArea onClick={() => handleUserCardClick(user)}>
                    <CardContent>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.full_name || user.email}
                      </Typography>
                      <Typography variant="body2">
                        {user.full_name ? user.email : null}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserSearchResults;