import React from 'react';

class YearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
    };
  }

  componentWillMount() {
    const currentyear = new Date().getFullYear();
    const yeararray = [];
    for (let i = 1995; i <= currentyear; i += 1) {
      yeararray.push(i);
    }
    yeararray.push('all');
    this.setState({ years: yeararray, });
  }

  render() {
    const years = this.state.years;
    return (
      <div>
        {years.map((year) => {
          return (
            <span onClick={() => this.props.handleYearChange(year)} style={{ padding: '5px 5px 5px 5px', backgroundColor: this.props.year === year.toString() ? 'yellow' : 'white', }} key={year}>
              {year}
            </span>
          );
        })}
      </div>
    );
  }
}

YearPicker.propTypes = {
  handleYearChange: React.PropTypes.func,
};

export default YearPicker;
