import { Component } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

export class Searchbar extends Component {
  state = {
    searchTerm: '',
  };
  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchTerm: value });
  };
  resetForm = () => {
    this.setState({ searchTerm: '' });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSearch(this.state.searchTerm);
    this.resetForm();
  };
  render = () => {
    return (
      <header className="Searchbar" onSubmit={this.handleSubmit}>
        <form className="SearchForm">
          <button type="submit" className="SearchForm_button"></button>
          <input
            className="SearchForm_input"
            type="text"
            placeholder="Search images and photos"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  };
}
Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
