import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Alert,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { connect } from 'react-redux';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';
import PasswordReset from './pages/password-reset';
import ForgotPassword from './pages/forgot-password';
import PrivateRoute from './components/private-route'; // set everything to private after testing
import { AlertState } from './state/reducers/alert';

interface Props {
  alert: AlertState;
  loading: boolean;
}

const Routes = ({ alert, loading }: Props) => {

  return (
    <BrowserRouter>
      <main>
        {/* <PrimaryAppBarContainer /> */}
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/password-reset/:token" component={PasswordReset} />
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

const mapStateToProps = (state: any) => ({
  alert: state.alert,
  loading: state.loading.isLoading
});

export default connect(mapStateToProps)(Routes);
