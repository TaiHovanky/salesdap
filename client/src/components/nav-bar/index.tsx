import * as React from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import { Handshake, AccountCircle } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserState } from '../../state/reducers/user';

interface NavBarProps {
  user: UserState
}

const NavBar = ({ user }: NavBarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('/api/v1/logout')
      .then(() => {
        handleClose();
        history.push('/');
      })
      .catch((err) => console.log('logout err', err));
  }

  const handleHomeClick = () => {
    history.push('/home');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleHomeClick}
          >
            <Handshake />
          </IconButton>
          <Button variant="text" onClick={handleHomeClick}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
              Salesdap
            </Typography>
          </Button>

          {user && user.email && <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link style={{ color: 'black', textDecoration: 'none' }} to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(NavBar);