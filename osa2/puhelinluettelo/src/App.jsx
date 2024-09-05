import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
	return (
		<form onSubmit={props.add}>
			<div>
				 filter shown with<input value={props.new}
				 onChange={props.change} />
	  		 </div> 
		 </form>
	)
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.add}>
        	<div>
            	name: <input value={props.name}
		    	onChange={props.nameChange} />
          	</div>
		  	<div>
		    	number: <input value={props.number}
		    	onChange={props.numberChange} />
		  	</div>
          	<div>
            	<button type="submit">add</button>
          	</div>
        </form>
	)
}

const Persons = ({ name, number, deletePerson }) => {
  return (
	<p>
		{name} {number} <button onClick={deletePerson}>delete</button> 
   	</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
	personService
		.getAll()
		.then(response => setPersons(response))
  }, [])

  const	addPerson = (event) => {
	event.preventDefault()
	const phonebookObject = {
		name: newName,
		number: newNumber,
	}
	const boolean = persons.some(person => person.name === newName)
	if (boolean === true)
		window.alert(`${newName} is already added to phonebook`)
	else
	{
		personService
			.create(phonebookObject)
			.then(response => {
				setPersons(persons.concat(response))
		setNewName('')
		setNewNumber('')
		})
	}
  }
  const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  const deleteThisPerson = (person) => {
	window.confirm(`Delete ${person.name} ?`)
	personService
		.remove(person.id)
		.then(response => {
			setPersons(persons.filter(n => n.name !== person.name))
  		})
  }

  const addFilter = (event) => {
	event.preventDefault()
	setNewFilter('')
  }

  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter add={addFilter} filter={newFilter} change={handleFilterChange} />
	  <h3>add a new</h3>
	  <PersonForm name={newName} number={newNumber} add={addPerson}
	  nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
	  <ul>
	 	{personsToShow.map(person =>
	    <Persons 
		  key={person.name}
		  name={person.name}
		  number={person.number}
		  deletePerson={() => deleteThisPerson(person)}
	    />
	  )}
	  </ul>
   </div>

)}

export default App