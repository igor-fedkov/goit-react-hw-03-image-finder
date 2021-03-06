import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {

	static propTypes = {
		searchText: PropTypes.string,
		placeholder: PropTypes.string
	}

	state = {
		searchText: '',
		placeholder: 'Search images and photos'
	}

	onInputSearchQuery = (event) => {
		this.setState(
			{ searchText: event.target.value }
		)
	}

	onSubmit = (event) => {
		event.preventDefault();

		const { searchText } = this.state;
		const { onSearchQuerySubmit } = this.props;

		if (searchText.trim() === '') {
			this.setState({
				searchText: ''
			})
			return;
		}

		onSearchQuerySubmit(searchText);
		this.setState((state) => (
			{
				placeholder: state.searchText,
				searchText: ''
			})
		)
	}

	render() {
		const { searchText, placeholder } = this.state;
		
		return (
			<header className={s.Searchbar}>
				<form className={s.SearchForm} onSubmit={this.onSubmit}>
					<button type="submit" className={s['SearchForm-button']}>
						<span className={s['SearchForm-button-label']}>Search</span>
					</button>

					<input
						className={s['SearchForm-input']}
						value={searchText}
						onChange={this.onInputSearchQuery}
						type="text"
						autoComplete="off"
						autoFocus
						placeholder={placeholder}
						
					/>
				</form>
			</header >
		);
	};
}

Searchbar.propTypes = {
	onSearchQuerySubmit: PropTypes.func,
}

export default Searchbar;