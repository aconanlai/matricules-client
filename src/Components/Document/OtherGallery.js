import React from 'react';

class OtherGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.other.map((file, i) => {
          return (
            <div key={i}>
              <a target="blank" href={`http://localhost:4000/${this.props.accession}/${file}`}>
              <h3>{file}</h3></a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default OtherGallery;
