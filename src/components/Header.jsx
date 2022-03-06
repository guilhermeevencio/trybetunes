import React from 'react';
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
      </header>
    );
  }
}
