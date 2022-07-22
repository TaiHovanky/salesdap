import React, { useState, ChangeEvent, MouseEvent } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField
} from '@mui/material';
import { Handshake, AccountCircle } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState;
  handleLogout: any;
  hideError: any;
  handleSearch: any;
  handleProfileClick: any;
}

const NavBar = ({
  user,
  handleLogout,
  hideError,
  handleSearch,
  handleProfileClick
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    hideError();
    setAnchorEl(null);
  };

  const viewProfile = () => {
    handleProfileClick();
    handleClose();
  }

  const handleHomeClick = () => {
    hideError();
    history.push('/home');
  }

  const logoutAndClose = () => {
    handleClose();
    handleLogout();
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
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

          {user && user.email && <>
            <form onSubmit={(event: any) => handleSearch(event, searchText)}>
              <TextField
                label="Search Users"
                name="search-users"
                variant="standard"
                onChange={handleSearchChange}
                value={searchText}
                sx={{ color: '#fff' }}
              />
            </form>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ marginLeft: 'auto' }}
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
              <MenuItem onClick={viewProfile}>
                <Link style={{ color: 'black', textDecoration: 'none' }} to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link style={{ color: 'black', textDecoration: 'none' }} to="/contact-us">Contact Us</Link>
              </MenuItem>
              <MenuItem onClick={logoutAndClose}>Logout</MenuItem>
            </Menu>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;