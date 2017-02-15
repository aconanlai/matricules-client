import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.images.map((image, i) => {
          return (
            <img key={i} className={styles.galleryimage} alt={image} src={`http://localhost:4000/${this.props.accession}/${image}`} />
          );
        })}
      </div>
    );
  }
}

export default ImageGallery;
