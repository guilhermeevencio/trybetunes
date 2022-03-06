import React from 'react';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <Link to="/">Login</Link>
      </header>
    );
  }
}
