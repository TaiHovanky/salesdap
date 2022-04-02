import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';
import PasswordReset from './pages/password-reset';
import ForgotPassword from './pages/forgot-password';
import PrivateRoute from './components/private-route'; // set everything to private after testing

const Routes = () => {

  return (
    <BrowserRouter>
      <main>
        {/* <PrimaryAppBarContainer /> */}
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/password-reset/:token" component={PasswordReset} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default Routes;
