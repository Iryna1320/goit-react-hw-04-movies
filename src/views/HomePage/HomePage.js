import React, { Component } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=d407875648143dbc537f3d16fab2b882&page=1`,
    );

    this.setState({ movies: response.data.results });
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
