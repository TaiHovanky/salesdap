import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';
import PrivateRoute from './components/private-route'; // set everything to private after testing

const Routes = () => {

  return (
    <BrowserRouter>
      <main>
        {/* <PrimaryAppBarContainer /> */}
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default Routes;
