import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as BooksApi from '../BooksAPI';
import Books from './Books';

class SearchBooks extends Component {
  static propTypes = {
    updateBook: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    books: [],
  }

  handleInputChange = (query) => {
    this.setState({ query: query.trim() });
    if (query) {
      let searchedBook = [];
      BooksApi.search(query).then((res) => {
        if (res.length) {
          searchedBook = _.map(res, result => (
            { ...result, shelf: 'none' }
          ));
          this.setState({ books: searchedBook });
        } else {
          this.setState({ books: [] });
        }
      });
    } else {
      this.setState({ books: [] });
    }
  }

  updateBook = (book, shelf) => {
    const { updateBook } = this.props;
    updateBook(book, shelf);
  }

  renderBooks() {
    const { books } = this.state;
    return _.map(books, (book) => {
      return (
        <Books
          key={book.id}
          book={book}
          updateBook={(shelf) => { this.updateBook(book, shelf); }}
        />
      );
    });
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
              onChange={(event) => this.handleInputChange(event.target.value)} /*eslint-disable-line*/
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
