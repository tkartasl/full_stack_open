import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
		  onChange={handleNameChange} />
        </div>
		<div>
		  number: <input value={newNumber}
		  onChange={handleNumberChange} />
		</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <ul>
			{persons.map(person =>
			<p key={person.name}> {person.name} {person.number} </p>
			)}
	   </ul>
    </div>
  )

}

export default App