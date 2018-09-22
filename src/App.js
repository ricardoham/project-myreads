import React, { Component } from 'react';
import _ from 'lodash';
import * as BooksApi from './BooksAPI';
import BookList from './components/BookList';

class App extends Component {
  state = {
    books: [],
    shelf: '',
  };

  componentDidMount() {
    BooksApi.getAll().then((books) => {
      this.setState({ books });
    });
  }

  render() {
    const { books } = this.state;
    console.log('bla', this.state.books);
    console.log('the shel', this.state.shelf);
    return (
      <div>
        <BookList books={books} />
      </div>
    );
  }
}

export default App;
