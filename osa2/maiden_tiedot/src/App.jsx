import { useState, useEffect } from "react"
import axios from 'axios'

const Filter = (props) => {
	return (
		<form onSubmit={props.add}>
			<div>
				 find countries<input value={props.new} onChange={props.change} />
	  		 </div> 
		 </form>
	)
}

const ShowCountry = ({ country }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h4>languages:</h4>
			<ul>
				{Object.entries(country.languages).map(([code, language]) => (
					<li key={code}>{language}</li>
				))}
				</ul>
			 <img src={country.flags.png}></img>
		</div>
	)
}

const ListCountries = ({ countries, len }) => {
	const [selected, setSelected] = useState(null)

	if (len > 10)
		return <p>Too many matches, specify another filter</p>
	else if (len === 1)
		return <ShowCountry country={countries[0]} />
	else
	{
		return (
			<div>
				{countries.map((country) => (
					<p key={country.cca3}>{country.name.common}
					<button onClick={() => setSelected(country)}>show</button>
					</p>
				)
				)}
				{selected && (
					<ShowCountry country={selected} />
				)}
			</div>
		)
	}
}

const App = () => {
	const [filter, setFilter] = useState(null)
	const [countries, setCountries] = useState([])

	useEffect(() => {
		if (countries)
		{
			axios
				.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
				.then(response => {
					setCountries(response.data)
				})
		}
	}, [])

	const handleChange = (event) => {
		setFilter(event.target.value)
	}

	const addFilter = (event) => {
		event.preventDefault()
		setFilter('')
	}

	const countriesToShow = filter === '' ? [] : countries.filter(country => country.name.common.toLowerCase().includes(filter))
	console.log('Countries to show', countriesToShow)
	console.log('Countries to show length', countriesToShow.length)
	return (
		<div>
			<Filter add={addFilter} filter={filter} change={handleChange} />
			<ListCountries countries={countriesToShow} len={countriesToShow.length} set={setCountries} />
		</div>
	)
}

export default App
