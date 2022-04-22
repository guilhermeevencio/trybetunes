import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../Styles/Header.css';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  // fetchingUser = async () => {
  //   const user = await getUser();
  //   this.setState({ userName: user.name }, () => console.log(user));
  // }

  componentDidMount = () => {
    getUser()
      .then((user) => { this.setState({ userName: user.name, loading: false }); });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component" id="header-component">
        { loading
          ? <Loading />
          : (
            <div className="header">
              <h3 className="heading-title">TrybeTunes</h3>
              <div className="nav-container">
                <div className="nav-items">
                  <Link
                    to="/search"
                    data-testid="link-to-search"
                  >
                    Search
                  </Link>
                  <Link
                    to="/favorites"
                    data-testid="link-to-favorites"
                  >
                    Favorites
                  </Link>
                </div>
                <div className="profile-info">
                  <h3 data-testid="header-user-name">
                    {userName}
                  </h3>
                  <Link
                    to="/profile"
                    data-testid="link-to-profile"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            </div>)}
      </header>
    );
  }
}
