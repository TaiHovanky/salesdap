import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';

const Routes = () => {

  return (
    <BrowserRouter>
      <main>
        {/* <PrimaryAppBarContainer /> */}
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default Routes;
