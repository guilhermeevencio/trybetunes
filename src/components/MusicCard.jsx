import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checkedState: false,
    };
  }

  componentDidMount() {
    this.savedMusics();
  }

  handleCheck = async ({ target: { checked } }) => {
    const { trackId, removeFunc } = this.props;
    console.log(this.props);
    this.setState({ loading: true });
    const music = await getMusics(trackId);
    if (checked) {
      await addSong(...music);
      this.setState({ loading: false, checkedState: true });
    } else {
      this.setState({ loading: true });
      await removeSong(trackId);
      removeFunc(trackId);
      this.setState({ loading: false, checkedState: false });
    }
  }

  savedMusics = async () => {
    const { trackId } = this.props;
    const songs = await getFavoriteSongs();
    const mappingMusicIds = songs.map((song) => song.trackId);
    if (mappingMusicIds.includes(trackId)) {
      this.setState({ checkedState: true });
    }
  }

  render() {
    const { musicName, url, trackId } = this.props;
    const { loading, checkedState } = this.state;
    return loading
      ? <Loading />
      : (
        <div id={ trackId }>
          {musicName}
          <audio data-testid="audio-component" src={ url } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              name="favorite"
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleCheck }
              checked={ checkedState }
            />
          </label>
        </div>
      );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  removeFunc: PropTypes.func.isRequired,
};
