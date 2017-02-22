import React from 'react';

import DocumentsList from './DocumentsList';
import YearPicker from './YearPicker';
import KeywordPicker from './KeywordPicker';
import SearchTermPicker from './SearchTermPicker';

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '2016',
      keyword: '',
      loading: true,
      doclist: [],
      searchterm: '',
    };
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    // set mounted property so we only set state if component is mounted
    this.mounted = true;
    this.updateFilter();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateFilter() {
    this.setState({ loading: true, });
    let queries = '';
    queries += `year=${this.state.year}`;
    queries += `&keyword=${this.state.keyword}`;
    queries += `&searchterm=${this.state.searchterm}`;
    fetch(`http://localhost:4000/api/documents?${queries}`, {
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => {
      return response.json();
    }).then((json) => {
      // only set state if component is mounted
      if (this.mounted === true) {
        this.setState({ doclist: json, loading: false, });
      }
    });
  }

// these two functions require callbacks since setState is asynchronous
  handleYearChange(yr) {
    const year = yr.toString();
    this.setState({
      year,
    }, () => this.updateFilter());
  }

  handleKeywordChange(kw) {
    this.setState({
      keyword: kw,
    }, () => this.updateFilter());
  }

  handleSearchChange(term) {
    this.setState({
      searchterm: term,
    }, () => this.updateFilter());
  }

  render() {
    let doclist;
    if (this.state.loading === true) {
      doclist = 'loading';
    } else if (this.state.loading === false && this.state.doclist.length === 0) {
      doclist = 'no matching docs';
    } else {
      doclist = <DocumentsList doclist={this.state.doclist} />;
    }
    return (<div>
      <SearchTermPicker handleSearchChange={this.handleSearchChange} />
      <KeywordPicker handleKeywordChange={this.handleKeywordChange} />
      <YearPicker year={this.state.year} handleYearChange={this.handleYearChange} />
      {doclist}
    </div>);
  }
}

export default Documents;

