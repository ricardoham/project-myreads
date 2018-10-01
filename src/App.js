import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import './App.css';
import BookList from './components/BookList';
import SearchBooks from './components/SearchBooks';

class App extends Component {
  state = {
    books: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    this.setState({ loading: true });
    BooksApi.getAll().then((books) => {
      this.setState({
        books,
        loading: false,
      });
    }).catch(() => {
      this.setState({
        error: true,
      });
    });
  }

  updateBook = (book, shelf) => {
    BooksApi.update(book, shelf).then(() => {
      this.fetchBooks();
    });
  }

  render() {
    const { books, loading, error } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => ( /*eslint-disable-line*/
          <BookList
            updateBook={this.updateBook}
            books={books}
            loading={loading}
            error={error}
          />
        )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              updateBook={this.updateBook}
              books={books}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
