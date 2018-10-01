import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../App.css';
import BookShelf from './BookShelf';

class BookList extends React.PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,  /*eslint-disable-line*/
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    updateBook: PropTypes.func.isRequired,
  }

  renderShelves(currentShelf, shelfTitle) {
    const { books, updateBook } = this.props;
    return (
      <BookShelf
        books={_.filter(books, book => (
          book.shelf === currentShelf
        ))}
        shelfTitle={shelfTitle}
        updateBook={updateBook}
      />
    );
  }

  render() {
    const { loading, error } = this.props;
    if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    } if (error) {
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
