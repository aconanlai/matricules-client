import Link from 'next/link';
import React from 'react';

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const docs = this.props.doclist;
    const list = (<ul>
        {docs.map((doc, i) => {
          return <li key={i}><Link href={`/document?id=${doc.accession_number}`} as={`/document/${doc.accession_number}`}><a>{doc.accession_number} || {doc.title}</a></Link>{doc.title}</li>;
        })}
      </ul>);
    return (
      list
    );
  }
}

DocumentsList.propTypes = {
  doclist: React.PropTypes.array,
};

export default DocumentsList;


