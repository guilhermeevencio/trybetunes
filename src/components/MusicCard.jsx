import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
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

  handleCheck = async ({ target: { checked } }) => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    const musics = await getMusics(trackId);
    if (checked) {
      await addSong(...musics);
      this.setState({ loading: false, checkedState: true });
    } else {
      await removeSong(...musics);
      this.setState({ loading: false, checkedState: false });
    }
  }

  render() {
    const { musicName, url, trackId } = this.props;
    const { loading, checkedState } = this.state;
    return loading
      ? <Loading />
      : (
        <div id="music-card">
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
  trackId: PropTypes.number.isRequired,
};
