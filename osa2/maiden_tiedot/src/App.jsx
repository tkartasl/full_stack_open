import { useState, useEffect } from "react"
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const Filter = (props) => {
	return (
		<form onSubmit={props.add}>
			<div>
				 find countries<input value={props.new} onChange={props.change} />
	  		 </div> 
		 </form>
	)
}

const ShowCountry = ({ country, weather, set }) => {
	const lat = country.latlng[0]
	const lon = country.latlng[1]

	useEffect(() => {
		if (weather)
		{
			axios
				.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`)
				.then(response => {
					set(response.data)
				})
		}
		}, [lat, lon])
	const iconSource = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

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
			<h3>Weather in {country.capital}</h3>
			<p>temperature {weather.main.temp} Celsius</p>
			<img src={iconSource}></img>
			<p>wind {weather.wind.speed} m/s</p>
		</div>
	)
}

const ListCountries = (props) => {

	if (props.len > 10)
		return <p>Too many matches, specify another filter</p>
	else if (props.len === 1)
		return <ShowCountry country={props.countries[0]} weather={props.weather} set={props.setWeather} />
	else
	{
		return (
			<div>
				{props.countries.map((country) => (
					<p key={country.cca3}>{country.name.common}
					<button onClick={() => props.set(country)}>show</button>
					</p>
				)
				)}
				{props.selected && (
					<ShowCountry country={props.selected} weather={props.weather} set={props.setWeather} />
				)}
			</div>
		)
	}
}

const App = () => {
	const [filter, setFilter] = useState(null)
	const [countries, setCountries] = useState([])
	const [selected, setSelected] = useState(null)
	const [weather, setWeather] = useState([])

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
		setSelected(null)
	}

	const addFilter = (event) => {
		event.preventDefault()
		setFilter('')
	}

	const countriesToShow = filter === '' ? [] : countries.filter(country => country.name.common.toLowerCase().includes(filter))
	return (
		<div>
			<Filter add={addFilter} filter={filter} change={handleChange} />
			<ListCountries countries={countriesToShow} len={countriesToShow.length}
			set={setSelected} selected={selected}
			weather={weather} setWeather={setWeather} />
		</div>
	)
}

export default App
