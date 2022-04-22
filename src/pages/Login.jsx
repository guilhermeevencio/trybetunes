import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../Styles/Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);
    this.state = {
      isDisabled: true,
      showForm: true,
      inputName: '',
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
        loaded: false,
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    createUser({ name: inputName });
    this.setState({ loaded: true, showForm: false });
  }

  render() {
    const { isDisabled, loaded, showForm, inputName } = this.state;
    return (
      <div data-testid="page-login">
        {showForm
          ? (
            <div className="form-container">
              <section className="text-login">
                <h2>TrybeTunes</h2>
                <p>Choose your favorite songs and create a playlist preview.</p>
              </section>
              <form>
                <label htmlFor="login-name-input">
                  <input
                    type="text"
                    data-testid="login-name-input"
                    id="login-name-input"
                    onChange={ this.handleChanges }
                    value={ inputName }
                    placeholder="Enter your name here"
                  />
                </label>
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  onClick={ this.handleSubmit }
                  disabled={ isDisabled }
                >
                  Login
                </button>
              </form>
            </div>
          )
          : <Loading />}
        {loaded && <Redirect to="/search" />}
      </div>
    );
  }
}
