import React from 'react';
import Header from '../components/Header';

export default class PageProfile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        Page Profile
      </div>
    );
  }
}
