import { useState } from 'react';

import { CiSearch } from 'react-icons/ci';

export const Searchbar = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = evt => setSearchText(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();
    handleSearch(searchText);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
          <CiSearch size="32px" />
        </button>
        <input
          onChange={handleChange}
          className="SearchForm-input"
          name="search"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchText}
        />
      </form>
    </header>
  );
};
