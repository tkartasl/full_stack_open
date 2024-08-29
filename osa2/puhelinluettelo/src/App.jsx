import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const	addName = (event) => {
	event.preventDefault()
	const phonebookObject = {
		name: newName,
	}
	const boolean = persons.some(person => person.name === newName)
	if (boolean === true)
		window.alert(`${newName} is already added to phonebook`)
	else
	{
		setPersons(persons.concat(phonebookObject))
		setNewName('')
	}
  }

  const handleNamechange = (event) => {
	setNewName(event.target.value)
	console.log(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
		  onChange={handleNamechange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <ul>
			{persons.map(person =>
			<p key={person.name}> {person.name} </p>
			)}
	   </ul>
    </div>
  )

}

export default App