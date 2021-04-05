import React, { Component } from 'react';
import FetchApi from '../../services/themovieApi';
import MovieList from '../../components/MovieList';

class HomePage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    FetchApi.getTrendingMovie()
      .then(movie => {
        this.setState({ movies: [...movie] });
      })
      .catch(error => console.log(error));
  }

  render() {
    // console.log(this.props.match.url);

    const { movies } = this.state;

    return (
      <>
        <div>
          <h1>Popular movies</h1>
          <MovieList movies={movies} />
        </div>
      </>
      // ${this.props.match.url}
    );
  }
}

export default HomePage;
