import React, { Component, Suspense, lazy } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import FetchApi from '../../services/themovieApi';
// import axios from 'axios';
import routes from '../../routes';
import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "Cast" */),
);

const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "Reviews" */),
);

class MovieDetailsPage extends Component {
  state = {
    poster_path: '',
    title: '',
    genres: [],
    overview: '',
    vote_average: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    FetchApi.getMovieDetails(movieId)
      .then(movie => {
        this.setState({ ...movie });
      })
      .catch(error => console.log(error));
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }

    history.push(routes.homePage);

    // history.push(location.state.from);
    // history.push(location?.state?.from || routes.homePage);
  };

  render() {
    const { match } = this.props;
    // console.log(location);
    // const { movieId } = this.props.match.params;
    const { poster_path, title, genres, overview, vote_average } = this.state;

    return (
      <div>
        <button type="button" onClick={this.handleGoBack}>
          Go back
        </button>

        <div>
          <h1>{title}</h1>
          <div className={styles.movieItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
            <div className={styles.movieContent}>
              <h2 className={styles.movieContentTitle}>
                Users core: <span>{vote_average}</span>
              </h2>

              <h2 className={styles.movieContentTitle}>Overview</h2>
              <p> {overview}</p>
              <ul>
                <h2 className={styles.movieContentTitle}>Genres</h2>
                {genres.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2>Additional information</h2>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${match.url}/cast`,
                  state: { ...this.props.location.state },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${match.url}/reviews`,
                  state: { ...this.props.location.state },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>

        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

// MovieDetailsPage.propTypes = {
//   poster_path: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   genres: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//     }).isRequired,
//   ),
//   overview: PropTypes.string.isRequired,
//   vote_average: PropTypes.number.isRequired,
// };

export default MovieDetailsPage;

// path = '/movies/:movieId/cast';
