import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as BooksApi from '../BooksAPI';
import Books from './Books';

class SearchBooks extends Component {
  static propTypes = {
    updateBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired, /*eslint-disable-line*/
  }

  state = {
    query: '',
    books: [],
  }

  updateQuery = (query) => {
    if (!query) {
      this.setState({ books: [] });
    }
    this.setState({
      query,
    });
    this.handleSearch(query.trim());
  }

  handleSearch = (query) => {
    if (query) {
      BooksApi.search(query).then((response) => {
        if (response.length > 0) {
          this.handleSearchShelf(response);
        }
      });
    }
    this.setState({ books: [] });
  }

  handleSearchShelf = (res) => {
    const { books } = this.props;
    const searchBooks = _.map(res, (book) => {
      book.shelf = 'none';
      _.map(books, (b) => {
        if (book.id === b.id) {
          book.shelf = b.shelf;
        }
      });
      return book;
    });
    this.setState({ books: searchBooks });
  }

  updateBook = (book, shelf) => {
    const { updateBook } = this.props;
    updateBook(book, shelf);
  }

  renderBooks() {
    const { books } = this.state;
    return _.map(books, book => (
      <Books
        key={book.id}
        book={book}
        updateBook={(shelf) => { this.updateBook(book, shelf); }}
      />
    ));
  }

  render() {
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)} /*eslint-disable-line*/
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { query.length > 0 && this.renderBooks(query) }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
