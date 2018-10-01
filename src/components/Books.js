import React from 'react';
import PropTypes from 'prop-types';

class Books extends React.PureComponent {
  static propTypes = {
    updateBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired, /*eslint-disable-line*/
  }

  updateBook = (event) => {
    const { updateBook } = this.props;
    updateBook(event.target.value);
  }

  render() {
    const { book } = this.props;
    return (
      <div>
        <li>
          <div className="book">
            <div className="book-top">
              { book.imageLinks === undefined ? <div />
                : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }} />
              }
              <div className="book-shelf-changer">
                <select onChange={this.updateBook} value={book.shelf}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
      </div>
    );
  }
}

export default Books;
