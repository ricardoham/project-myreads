import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../App.css';
import BookShelf from './BookShelf';

class BookList extends React.PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,  /*eslint-disable-line*/
    error: PropTypes.bool.isRequired,
    updateBook: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  renderShelves(currentShelf, shelfTitle) {
    const { books, updateBook, loading } = this.props;
    const filterBook = _.filter(books, book => (
      book.shelf === currentShelf
    ));
    return (
      <BookShelf
        books={filterBook}
        shelfTitle={shelfTitle}
        updateBook={updateBook}
        loading={loading}
      />
    );
  }

  render() {
    const { error } = this.props;
    if (error) {
      return (
        <div>
          An error occurred during the process...
        </div>
      );
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.renderShelves('currentlyReading', 'Currently Reading')}
          {this.renderShelves('wantToRead', 'Want to Read')}
          {this.renderShelves('read', 'Read')}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;
