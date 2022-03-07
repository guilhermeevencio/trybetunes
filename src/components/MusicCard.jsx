import React from 'react';

export default class MusicCard extends React.Component {
  componentDidMount() {
    this.mappingMusics();
  }

  mappingMusics = async () => {
    const { musics } = this.props;
    console.log(this.props);
    const musicsFetched = await musics;
    // const renderingMusics = musics.map(({ trackName }) => (
    //   <p key={ trackName }>{ trackName }</p>
    // ));
    // return renderingMusics;
  }

  render() {
    return (
      <div>
        {/* { this.mappingMusics() } */}
        oi
      </div>
    );
  }
}
