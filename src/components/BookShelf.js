import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import '../App.css';
import Books from './Books';

class BookShelf extends React.PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired, /*eslint-disable-line*/
    shelfTitle: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired,
  }

  updateBook = (book, shelf) => {
    const { updateBook } = this.props;
    updateBook(book, shelf);
  }

  renderBooks() {
    const { books } = this.props;
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
    const { shelfTitle } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.renderBooks()}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
