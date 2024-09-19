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

const ListCountries = ({ countries, len }) => {
	if (len > 10)
	{
		return (<p>Too many matches, specify another filter</p>)
	}
	else if (len === 1)
	{
		return (
			<div>
				<h2>{countries[0].name.common}</h2>
				<p>capital {countries[0].capital}</p>
				<p>area {countries[0].area}</p>
				<h4>languages:</h4>
			    <ul>
					{Object.entries(countries[0].languages).map(([code, language]) => (
						<li key={code}>{language}</li>
					))}
   				 </ul>
				 <img src={countries[0].flags.png}></img>
			</div>
		)
	}
	else
	{
		return (
			<div>
			{countries.map((country) => (
				<p key={country.cca3}>{country.name.common}</p>
			)
			)}
			</div>
		)
	}
}

const App = () => {
	const [value, setValue] = useState('')
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
			<ListCountries countries={countriesToShow} len={countriesToShow.length} />
		</div>
	)
}

export default App
