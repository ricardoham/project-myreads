import React from 'react';
import _ from 'lodash';
import '../App.css';
import BookShelf from './BookShelf';

class BookList extends React.PureComponent {
  render() {
    const { books } = this.props;
    // console.log('FilterBooks', filterBooks);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            books={_.filter(books, (book) => {
              return book.shelf === 'currentlyReading';
            })}
            shelfTitle="Currently Reading"
          />
          <BookShelf
            books={_.filter(books, (book) => {
              return book.shelf === 'wantToRead';
            })}
            shelfTitle="Want to Read"
          />
          <BookShelf
            books={_.filter(books, (book) => {
              return book.shelf === 'read';
            })}
            shelfTitle="Read"
          />
        </div>
      </div>
    );
  }
}

export default BookList;
