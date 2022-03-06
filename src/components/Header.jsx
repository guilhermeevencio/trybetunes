import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class extends React.Component {
  handleUser = () => {
    getUser();
  };

  render() {
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">{this.handleUser()}</h3>
        <Link to="/">Login</Link>
      </header>
    );
  }
}
