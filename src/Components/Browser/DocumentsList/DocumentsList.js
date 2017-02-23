import React from 'react';

class DocumentsList extends React.Component {
  render() {
    const docs = this.props.doclist;
    const list = (<ul>
        {docs.map((doc, i) => {
          return <li key={i}>{doc.title}</li>;
        })}
      </ul>);
    return (
      list
    );
  }
}

export default DocumentsList;


