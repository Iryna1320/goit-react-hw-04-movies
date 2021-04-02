import React, { Component, Suspense, lazy } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import axios from 'axios';
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

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=d407875648143dbc537f3d16fab2b882`,
    );
    // console.log(response.data);
    this.setState({ ...response.data });
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    // history.push(location.state.from);

    history.push(location?.state?.from || routes.homePage);
  };

  render() {
    const { match } = this.props;
    // console.log(location);
    // const { movieId } = this.props.match.params;
    const { poster_path, title, genres, overview, vote_average } = this.state;
    // const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

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
              <NavLink to={`${match.url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
        </div>

        <Suspense>
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
