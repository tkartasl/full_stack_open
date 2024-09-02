import { useState } from 'react'

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

const Persons = ( { filter, persons}) => {

	const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))
	return (
		<ul>
			{personsToShow.map(person =>
			<p key={person.name}> {person.name} {person.number} </p>
			)}
   		</ul>
	)
}


const App = () => {
	const [persons, setPersons] = useState([
	  { name: 'Arto Hellas', number: '040-123456' },
	  { name: 'Ada Lovelace', number: '39-44-5323523' },
	  { name: 'Dan Abramov', number: '12-43-234345' },
	  { name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
		setPersons(persons.concat(phonebookObject))
		setNewName('')
		setNewNumber('')
	}
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
	  <Persons filter={newFilter} persons={persons} />
    </div>
  )

}

export default App