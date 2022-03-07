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
      searchResult: [],
      loaded: false,
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
        searchInput: value,
      };
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { searchInput, searchResult } = this.state;
    this.setState({ showForm: false, searchToShow: searchInput });
    const artistResult = await searchAlbumsAPI(searchInput);
    this.setState({ searchResult: artistResult, loaded: true, searchInput: '' });
  }

  render() {
    const {
      isDisabled,
      searchInput,
      showForm,
      searchResult,
      loaded,
      searchToShow } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {showForm
          && (
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
          )}
        {loaded
          ? (
            <p>
              {`Resultados de busca de: ${searchToShow}`}
            </p>
          )
          : null}

      </div>
    );
  }
}

// Continuar na parte de tratar os dados da api, depois encontrar uma maneira de exivir o componente so apos a pesquisa, juntamente com o carregando... provavelmente a gente usara o loaded pra poder carregar a função que vai retornar o paragrafo com o nome do artista e tambem retornar todos os artistas, que provavelmente serao links, onde utilizaremos os id deles pra redirecionar.
