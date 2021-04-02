import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd407875648143dbc537f3d16fab2b882';

class Reviews extends Component {
  state = {
    review: [],
  };

  async componentDidMount() {
    // console.log(this.props.match.params.movieId);
    // console.log(this.props.review);
    // console.log(getFetchMovieCast());

    const { movieId } = this.props.match.params;
    // this.setState({ credit_id: [this.props.casts] });

    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-U`,
    );

    this.setState({ review: [...response.data.results] });
    // console.log(response.data.results);
  }

  render() {
    const { review } = this.state;

    return review.length > 0 ? (
      <ul>
        {review.map(({ id, author, content }) => {
          return (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <h2>Not information</h2>
    );
  }
}

Reviews.propTypes = {
  review: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
};

export default Reviews;
