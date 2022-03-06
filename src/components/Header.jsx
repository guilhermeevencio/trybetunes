import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userName: user.name });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          { userName || <Loading />}
        </h3>
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Pesquisa
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritas
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}
