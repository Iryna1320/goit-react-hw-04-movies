import React, { Component } from 'react';
import MovieList from '../../components/MovieList';
import axios from 'axios';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: '',
    error: null,
  };

  componentDidMount() {
    if (this.props.location.search) {
      this.fetchMovie(this.props.location.search);
    }
  }

  fetchMovie = query => {
    // const { query } = this.state;
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=d407875648143dbc537f3d16fab2b882&language=en-US&page=1&include_adult=false`,
      )
      .then(response => {
        this.setState({ movies: response.data.results });
      })

      .catch(error => this.setState({ error }));
  };

  changeInput = e => {
    this.setState({ query: e.currentTarget.value });
    // console.log(e.currentTatget.value);
  };

  handleSubmit = e => {
    const { location, history } = this.props;
    const { query } = this.state;

    e.preventDefault();

    if (query === '') {
      alert('Sorry, please try again');
      this.setState({ query: '' });
      return;
    }

    this.fetchMovie(query);
    history.push({ ...location, search: `query=${query}` });
  };

  render() {
    const { movies, query } = this.state;

    return (
      <div>
        <header className={styles.Searchbar}>
          <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
            <button type="submit" className={styles.SearchFormButton}>
              <span className={styles.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              onChange={this.changeInput}
              className={styles.SearchFormInput}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              type="text"
              value={query}
              autoComplete="off"
              placeholder="Search movies"
            />
          </form>
        </header>
        <MovieList movies={movies} />
      </div>
    );
  }
}

export default MoviesPage;
