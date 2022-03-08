import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
// import Loading from '../components/Loading';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicArtist: '',
      musicAlbum: '',
      musicsArr: [],
      // isLoaded: false,
    };
  }

  componentDidMount() {
    this.gettingId();
  }

  gettingId = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    // console.log(musics);
    const { artistName, collectionName } = musics[0];
    // console.log(artistName, collectionName);
    // const musicInfos = musics.map(({ trackName, previewUrl }, i) => {
    //   if (i > 0) {
    //     return ({name: trackName, previewUrl})
    //   }
    // }
    this.setState({
      musicArtist: artistName,
      musicAlbum: collectionName,
      musicsArr: musics,
      // isLoaded: true,
    });
  }

  render() {
    const { musicArtist, musicAlbum, musicsArr } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
            && <MusicCard key={ trackId } musicName={ trackName } url={ previewUrl } />),
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
