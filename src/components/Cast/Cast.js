import React, { Component } from 'react';
import FetchApi from '../../services/themovieApi';
import PropTypes from 'prop-types';

class Cast extends Component {
  state = {
    casts: [],
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    FetchApi.getMovieCast(movieId)
      .then(cast => {
        this.setState({ casts: [...cast] });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { casts } = this.state;

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
