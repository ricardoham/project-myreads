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

  render() {
    const {
      books, loading, error, updateBook,
    } = this.props;
    if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    } if (error) {
      return (
        <div>
          An error occured during the process...
        </div>
      );
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            books={_.filter(books, book => (
              book.shelf === 'currentlyReading'
            ))}
            shelfTitle="Currently Reading"
            updateBook={updateBook}
          />
          <BookShelf
            books={_.filter(books, book => (
              book.shelf === 'wantToRead'
            ))}
            shelfTitle="Want to Read"
            updateBook={updateBook}
          />
          <BookShelf
            books={_.filter(books, book => (
              book.shelf === 'read'
            ))}
            shelfTitle="Read"
            updateBook={updateBook}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;
