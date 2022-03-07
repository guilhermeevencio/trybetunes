import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      searchInput: '',
      showForm: true,
      searchResult: '',
    };
  }

  handleChanges = (event) => {
    event.preventDefault();
    const minNameLength = 2;
    this.setState(() => {
      const { value } = event.target;
      let disabled = true;
      if (value.length >= minNameLength) {
        disabled = false;
      }
      return {
        isDisabled: disabled,
        loaded: false,
        searchInput: value,
      };
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({ showForm: false });
    const artistResult = await searchAlbumsAPI(searchInput);
    this.setState({ searchResult: artistResult, searchInput: '' });
  }

  render() {
    const { isDisabled, searchInput, showForm } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {showForm
          ? (
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.handleChanges }
                value={ searchInput }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                onClick={ this.handleSubmit }
                disabled={ isDisabled }
              >
                Entrar
              </button>
            </form>
          )
          : <Loading />}
      </div>
    );
  }
}
