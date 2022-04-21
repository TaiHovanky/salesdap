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
}

const Routes = ({ alert, loading, user }: Props) => {
  return (
    <BrowserRouter>
      <main>
        <NavBarContainer user={user} />
        <Switch>
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <PrivateRoute exact path="/profile" component={ProfileContainer} user={user} />
          <Route exact path="/forgot-password" component={ForgotPasswordContainer} />
          <Route path="/password-reset/:token" component={PasswordResetContainer} />
        </Switch>
        {alert.isOpen && <Alert
          variant="standard"
          severity={alert.alertType || "error"}
          sx={{
            margin: '2rem auto 0 auto',
            borderRadius: '10px',
            width: 'fit-content',
            maxWidth: '50%',
            flexWrap: 'wrap'
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
