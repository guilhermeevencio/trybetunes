import React from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);
    this.state = {
      isDisabled: true,
    };
  }

  handleChanges(event) {
    event.preventDefault();
    const minNameLength = 3;
    this.setState(() => {
      const { value } = event.target;
      let disabled = true;
      if (value.length >= minNameLength) {
        disabled = false;
      }
      return {
        inputName: value,
        isDisabled: disabled,
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    createUser({ name: inputName });
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChanges }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
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
