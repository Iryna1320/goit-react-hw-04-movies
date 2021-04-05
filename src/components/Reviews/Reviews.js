import React, { Component } from 'react';
import FetchApi from '../../services/themovieApi';
import PropTypes from 'prop-types';

class Reviews extends Component {
  state = {
    review: [],
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    FetchApi.getMovieRewiews(movieId)
      .then(rewiew => {
        this.setState({ review: [...rewiew] });
      })
      .catch(error => console.log(error));

    // console.log(this.props.match.params.movieId);
    // console.log(this.props.review);
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
