import React from 'react';
import AudioGallery from './AudioGallery';
import OtherGallery from './OtherGallery';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accession_number: '',
      categorie: '',
      date: '',
      description: '',
      descriptionFrench: '',
      keywords: [],
      images: [],
      links: [],
      medium: '',
      notes: '',
      physical_description: '',
      sujet: '',
      sujetFrench: '',
      support: '',
      title: '',
      audio: [],
      video: [],
      other: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    fetch(`http://matricules.nfshost.com/api/document/${this.props.params.id}`).then((response) => {
      return response.json();
    }).then((_data) => this.setState({ 
      accession_number: _data.accession_number,
      categorie: _data.categorie,
      date: _data.date,
      description: _data.description,
      descriptionFrench: _data.description_fr,
      keywords: _data.keywords,
      images: _data.images,
      links: _data.links,
      medium: _data.medium,
      notes: _data.notes,
      physical_description: _data.physical_description,
      sujet: _data.sujet,
      sujetFrench: _data.sujet_fr,
      support: _data.support,
      title: _data.title,
      videos: _data.videos,
      audio: _data.audio,
      other: _data.other,
    }));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    // only display edit button to logged in user
    const language = 'fr';
    const titlestring = (language === 'fr') ? 'Titre forgé' : 'Formed Title';
    const images = <div>images: </div>;
    const audios = <div>audio: </div>;
    const others = <div>other: </div>;

    return (<div>
      <div>
        {(language === 'fr') ? 'Numéro d\'accession' : 'Accession Number' }: {this.state.accession_number}
      </div>
      <div>
        {(language === 'fr') ? 'Categorie' : 'Category' }: {this.state.categorie}
      </div>
      <div>
      Date: {this.state.date}
      </div>
      <div>
      Description: {(language === 'fr' && this.state.descriptionFrench !== '') ? this.state.descriptionFrench : this.state.description }
      </div>
      <div>
      Keywords: {this.state.keywords}
      </div>
      <div>
      Links:
      </div>
      <div>
        {(language === 'fr') ? 'Médium' : 'Medium' }: {this.state.medium}
      </div>
      <div>
      Notes: {this.state.notes}
      </div>
      <div>
        {(language === 'fr') ? 'Description physique' : 'Physical Description' }: {this.state.physical_description}
      </div>
      <div>
        {(language === 'fr') ? 'Sujet' : 'Subject' }: {(language === 'fr' && this.state.sujetFrench !== '') ? this.state.sujetFrench : this.state.sujet }
      </div>
      <div>
      Support: {this.state.support}
      </div>
      <div>
        {titlestring}: {this.state.title}
      </div>
      {(this.state.audio.length > 0) ? audios : null}
      {(this.state.images.length > 0) ? images : null}
      {(this.state.other.length > 0) ? others : null}
    </div>
    );

  return (
    <div>{this.props.params.id}</div>
  )
  }
}

export default Document;
