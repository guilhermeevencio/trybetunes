import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
// import Loading from '../components/Loading';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicArtist: '',
      musicAlbum: '',
      musicsObj: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.gettingId();
  }

  gettingId = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const { artistName, collectionName } = musics.shift();
    const musicName = musics.map(({ trackName }) => trackName);
    console.log(artistName, collectionName);
    this.setState({
      musicArtist: artistName,
      musicAlbum: collectionName,
      musicsObj: musicName,
      isLoaded: true
    });
  }

  render() {
    return <>teste</>;
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }).isRequired }).isRequired,
};
