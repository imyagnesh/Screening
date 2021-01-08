import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, NavLink, Link, Route, Switch } from 'react-router-dom';
import './app.scss';

const Home = lazy(() =>
  import(/* webpackChunkName: "Home", webpackPrefetch: true */ './pages/home'),
);
const About = lazy(() => import('./pages/about'));
const Dashboard = lazy(() => import('./pages/dashboard'));

const App = () => (
  <Router>
    <h1>{`This app is running in ${process.env.NODE_ENV} mode`}</h1>

    <header>
      <Link to="/" className="logo">
        CompanyLogo
      </Link>
      <nav>
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          About
        </NavLink>
        <NavLink to="/dashboard" activeClassName="active">
          Dashboard
        </NavLink>
      </nav>
    </header>

    <Suspense fallback={<div>Page is Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
