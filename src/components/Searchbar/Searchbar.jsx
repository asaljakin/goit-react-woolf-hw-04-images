import { Component } from 'react';

import { CiSearch } from 'react-icons/ci';

export class Searchbar extends Component {
  state = {
    searchText: '',
  };

  handleChange = evt => {
    this.setState({ searchText: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.handleSubmit(this.state.searchText);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
            <CiSearch size="32px" />
          </button>
          <input
            onChange={this.handleChange}
            className="SearchForm-input"
            name="search"
            type="text"
            required
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
          />
        </form>
      </header>
    );
  }
}
