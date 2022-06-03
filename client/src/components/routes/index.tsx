import HomeContainer from '../../containers/home';
import RegisterContainer from '../../containers/register';
import LoginContainer from '../../containers/login';
import ProfileContainer from '../../containers/profile';
import PasswordResetContainer from '../../containers/password-reset';
import ForgotPasswordContainer from '../../containers/forgot-password';
import PrivateRoute from '../private-route'; // set everything to private after testing
import NavBarContainer from '../../containers/nav-bar';
import {
  Alert,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AlertState } from '../../state/reducers/alert';
import { UserState } from '../../state/reducers/user';

interface Props {
  alert: AlertState;
  loading: boolean;
  user: UserState;
  handleAlertClose: any;
}

const Routes = ({
  alert,
  loading,
  user,
  handleAlertClose
}: Props) => {
  return (
    <BrowserRouter>
      <main>
        <NavBarContainer user={user} />
        <Switch>
          <PrivateRoute exact path="/home" component={HomeContainer} user={user} />
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <PrivateRoute exact path="/profile" component={ProfileContainer} user={user} />
          <Route exact path="/forgot-password" component={ForgotPasswordContainer} />
          <Route path="/reset-password/:token" component={PasswordResetContainer} />
        </Switch>
        {alert.isOpen && <Alert
          variant="standard"
          severity={alert.alertType || "error"}
          onClose={handleAlertClose}
          sx={{
            position: 'fixed',
            bottom: '-2%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1570,
            borderRadius: '10px',
            width: 'fit-content',
            maxWidth: '33%',
            flexWrap: 'nowrap'
          }}
        >
          {alert.message}
        </Alert>}
        <Backdrop open={loading} sx={{ zIndex: 1550 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    </BrowserRouter>
  );
}

export default Routes;
