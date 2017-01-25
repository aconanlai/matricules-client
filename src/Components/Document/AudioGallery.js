import React from 'react';

class AudioGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.audio.map((file, i) => {
          return (
            <div key={i}>
              <audio id="player" controls>
                <source
                  src={`http://localhost:4000/${this.props.accession}/${file}`}
                />
              </audio>
              <a target="blank" href={`http://localhost:4000/${this.props.accession}/${file}`}>Download</a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AudioGallery;
