import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import { Component } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: ''
  }

  handleChange = e => {
    this.setState({query: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.query.trim()) {
			return toast.error('Your query is not valid')
		}
    this.props.onSubmit(this.state.query)
    this.setState({query: ''})
  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
              <ImSearch />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
  
};

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
