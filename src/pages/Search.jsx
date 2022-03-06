import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
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
        inputName: value,
        isDisabled: disabled,
        loaded: false,
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChanges }
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
      </div>
    );
  }
}
