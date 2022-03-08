import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  componentDidMount() {
  }

  render() {
    const { musicName, url } = this.props;
    return (
      <div>
        {musicName}
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
