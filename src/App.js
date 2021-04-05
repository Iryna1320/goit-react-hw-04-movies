import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from './components/AppBar';
import routes from './routes';
import './App.css';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage' /* webpackChunkName: "movie-details" */),
);

const App = () => (
  <>
    <AppBar />

    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route exact path={routes.homePage} component={HomePage} />
        <Route exact path={routes.moviesPage} component={MoviesPage} />
        <Route path={routes.movieDetailsPage} component={MovieDetailsPage} />
        <Redirect to={routes.homePage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
