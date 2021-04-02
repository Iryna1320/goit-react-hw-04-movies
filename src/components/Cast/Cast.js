import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd407875648143dbc537f3d16fab2b882';

class Cast extends Component {
  state = {
    casts: [],
  };

  async componentDidMount() {
    // console.log(this.props.match.params.movieId);
    // console.log(this.props.casts);
    // console.log(getFetchMovieCast());

    const { movieId } = this.props.match.params;
    // this.setState({ credit_id: [this.props.casts] });

    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
    );

    this.setState({ casts: [...response.data.cast] });
    // console.log(response.data.cast);
  }

  render() {
    const { casts } = this.state;
    // const { profile_path } = profilePath;
    return casts.length > 0 ? (
      <ul>
        {casts.map(({ id, name, profile_path, character }) => {
          return (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt=""
              />
              <h2>{name}</h2>
              <p>{character}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <h2>Not information</h2>
    );
  }
}

Cast.propTypes = {
  casts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
    }),
  ),
};

export default Cast;
