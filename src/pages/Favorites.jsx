import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.filteringSongs = this.filteringSongs.bind(this);
    this.state = {
      musicsArr: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.likedMusics();
  }

  likedMusics = async () => {
    this.setState({ loading: true });
    const songs = await getFavoriteSongs();
    this.setState({ musicsArr: songs, loading: false });
    return songs;
  }

  filteringSongs(musicId) {
    this.setState({ loading: true });
    const { musicsArr } = this.state;
    const filteredSongs = musicsArr.filter(({ trackId }) => trackId !== musicId);
    this.setState({ musicsArr: filteredSongs, loading: false });
  }

  render() {
    const { musicsArr, loading } = this.state;
    console.log(this.filteringSongs);
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading
          ? (
            <Loading />
          )
          : (
            <div>
              {musicsArr.map(
                ({ trackName, previewUrl, trackId }) => (
                  <MusicCard
                    key={ trackId }
                    musicName={ trackName }
                    url={ previewUrl }
                    trackId={ trackId }
                    removeFunc={ this.filteringSongs }
                  />),
              )}
            </div>
          )}
      </div>
    );
  }
}
