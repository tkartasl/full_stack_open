import { useState, useEffect } from 'react'
import personService from './services/persons'
//import './index.css'

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

const Notification = ({ message, style }) => {
	if (message === null)
		return (null)
	return (
		<div style={style}>{message}</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNotification] = useState('')
  const [newStyle, setStyle] = useState({})

  const notificationStyle = {
	color: 'green',
	backgroundColor: 'lightgrey',
	fontSize: 18,
	padding: 10,
	border: '2px solid green'
  }

  useEffect(() => {
	personService
		.getAll()
		.then(response => setPersons(response))
  }, [])

  const showNotification = (message) => {
	setNotification(message)
	setStyle(notificationStyle)
	setTimeout(() => {
		setNotification(null)
		setStyle(null)
	}, 4000)
}

  const updatePerson = (person) => {
	const changedPerson = { ...person, number: newNumber }
	personService
	.update(changedPerson, person.id)
	.then(response => {
		setPersons(persons.map(p => p.id !== person.id ? p : response))
		setNewName('')
		setNewNumber('')
		showNotification(`Updated contact ${person.name}`)
	})
	.catch(error => {
		alert(
			`the person '${person.name}' was already deleted from server`
		)
		setPersons(persons.filter(n => n.id !== person.id))
	})
  }

  const addPerson = () => {
	const phonebookObject = {
		name: newName,
		number: newNumber,
	}
	personService
		.create(phonebookObject)
		.then(response => {
			setPersons(persons.concat(response))
			setNewName('')
			setNewNumber('')
			showNotification(`Added ${newName}`)
	})
  }

  const	handlePersonChange = (event) => {
	event.preventDefault()
	const person = persons.find(person => person.name === newName)

	if (person)
	{
		if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
		updatePerson(person)
	}
	else
		addPerson()
  }

  const deleteThisPerson = (person) => {
	if (window.confirm(`Delete ${person.name} ?`))
	{
		personService
			.remove(person.id)
			.then(response => {
				showNotification(`Deleted ${person.name}`)
				setPersons(persons.filter(n => n.id !== person.id))
			})
	}
  }

  const addFilter = (event) => {
	event.preventDefault()
	setNewFilter('')
  }
  const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={newNotification} style={newStyle} />
	  <br />
	  <Filter add={addFilter} filter={newFilter} change={handleFilterChange} />
	  <h3>add a new</h3>
	  <PersonForm name={newName} number={newNumber} add={handlePersonChange}
	  nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
	 	{personsToShow.map(person =>
	    <Persons 
		  key={person.name}
		  name={person.name}
		  number={person.number}
		  deletePerson={() => deleteThisPerson(person)}
	    />
	  )}
   </div>
)}

export default App