import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      searchInput: '',
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
    this.renderingAlbums();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({ searchToShow: searchInput });
    const artistResult = await searchAlbumsAPI(searchInput);
    this.setState({ searchResult: artistResult, loaded: true, searchInput: '' });
  }

  renderingAlbums = () => {
    const { searchResult } = this.state;
    if (searchResult.length === 0) {
      return (<h3>Nenhum álbum foi encontrado</h3>);
    }
    const mappingAlbuns = searchResult.map(
      ({ collectionId, collectionName, artworkUrl100 }) => (
        <Link
          to={ `/album/${collectionId}` }
          key={ collectionId }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt="collectionName" />
          <p>{collectionName}</p>
        </Link>
      ),
    );
    return mappingAlbuns;
  };

  render() {
    const {
      isDisabled,
      searchInput,
      searchToShow,
      loaded,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

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
            Buscar
          </button>
        </form>

        {loaded
          && (
            (
              <section>
                <p>{`Resultado de álbuns de: ${searchToShow}`}</p>
                {this.renderingAlbums()}
              </section>)
          )}

      </div>
    );
  }
}
