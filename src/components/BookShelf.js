import React from 'react';
import _ from 'lodash';
import '../App.css';
import Books from './Books';

class BookShelf extends React.PureComponent {

  renderBooks() {
    const { books } = this.props;
    return _.map(books, (book) => {
      return (
        <Books
          key={book.id}
          authors={book.authors}
          image={book.imageLinks.thumbnail}
          title={book.title}
        />
      );
    });
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
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
