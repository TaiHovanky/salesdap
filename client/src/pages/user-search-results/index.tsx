import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';

interface Props {
  users: Array<any>;
}

const UserSearchResults = ({
  users
}: Props) => {
  console.log('user search results-----', users.map((u) => u.email));
  // const [res, setRes] = useState<Array<any>>([]);
  // useEffect(() => {
  //   console.log('use effect')
  //   setRes(users);
  // }, [users])
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
            {users.map((item: any, index: number) => {
              return (
                <Card sx={{ minWidth: 275, margin: '0.5rem 0' }} key={index}>
                  <CardContent>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.full_name || item.email}
                    </Typography>
                    <Typography variant="body2">
                      {item.full_name ? item.email : null}
                    </Typography>
                  </CardContent>
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