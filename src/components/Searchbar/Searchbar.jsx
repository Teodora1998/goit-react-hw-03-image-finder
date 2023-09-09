import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

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
      <header className={css.Searchbar} onSubmit={this.handleSubmit}>
        <form className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}></button>
          <input
            className={css.SearchForm_input}
            type="text"
            // autocomplete="off"
            // autofocus
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
