import * as React from 'react';
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
import { UserState } from '../../state/reducers/user';

interface Props {
  user: UserState;
  handleLogout: any;
}

const NavBar = ({ user, handleLogout }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

          {user && user.email && <>
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
              <MenuItem>
                <Link style={{ color: 'black', textDecoration: 'none' }} to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;