import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicArtist: '',
      musicAlbum: '',
      musicsArr: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.gettingId();
  }

  gettingId = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musics = await getMusics(id);
    const { artistName, collectionName } = musics[0];
    this.setState({
      musicArtist: artistName,
      musicAlbum: collectionName,
      musicsArr: musics,
      loading: false,
    });
  }

  render() {
    const { musicArtist, musicAlbum, musicsArr, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading
          ? <Loading />
          : (
            <>
              <h2
                data-testid="artist-name"
              >
                {musicArtist}
              </h2>
              <h3
                data-testid="album-name"
              >
                {musicAlbum}
              </h3>
              {musicsArr.map(
                ({ trackName, previewUrl, trackId }, i) => (
                  i > 0
                  && <MusicCard
                    key={ trackId }
                    musicName={ trackName }
                    url={ previewUrl }
                    trackId={ trackId }
                    removeFunc={ () => {} }
                  />),
              )}
            </>
          )}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }).isRequired }).isRequired,
};
