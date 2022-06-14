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
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { AlertState } from '../../state/reducers/alert';
import { UserState } from '../../state/reducers/user';
import Payment from '../../pages/payment';
import SuccessDisplayContainer from '../../containers/payment-success';
// import { createBrowserHistory } from 'history';

interface Props {
  alert: AlertState;
  loading: boolean;
  user: UserState;
  handleAlertClose: any;
  history: any;
}

const Routes = ({
  alert,
  loading,
  user,
  handleAlertClose,
  history
}: Props) => {
  // const history = createBrowserHistory();
  // console.log('history', history);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios.post("http://localhost:3001/api/v1/refresh_token", {
  //     refreshToken: localStorage.getItem('sdtr')
  //   }).then((res: any) => {
  //     console.log('data', res.data);
  //     setAccessToken(res.data.token);
  //     localStorage.setItem('sdtr', res.data.refreshToken);
  //     hideError();
  //     setIsLoading(false);
  //     // history.push('/home');
  //     if (res.data && res.data.email) {
  //       updateUser(res.data);
  //       // window.location.href = 'http://localhost:3000/home';
  //     }
  //   });
  // }, []);

  return (
    <BrowserRouter history={history}>
      <main>
        <NavBarContainer user={user} />
        <Switch>
          <PrivateRoute exact path="/home" component={HomeContainer} user={user} />
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <Route path="/pay" component={Payment} />
          <Route path="/success" component={SuccessDisplayContainer} />
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
