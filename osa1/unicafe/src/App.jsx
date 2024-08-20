import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const Display = ({ text, count, sign}) => {
	return (
		  <table style={{ width: 100}}>
			<tbody>
				<tr>
					<td style={{ textAlign: 'left', paddingRight: '10px' }}>{text}</td>
					<td style={{ textAlign: 'right', paddingLeft: '20px' }}>{count} </td>
					<td>{sign}</td>
				</tr>
			</tbody>
		  </table>
	)
}

const StatisticLine = (props) => {
	return (
	<div>
		<Display text={props.text} count={props.count} sign={props.sign} />
	</div>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad
	if (total == 0)
		return <div>No feedback given</div>
	else
		return(
			<div>
				<StatisticLine text='good' count={good} />
				<StatisticLine text='neutral' count={neutral} />
				<StatisticLine text='bad' count={bad} />
				<StatisticLine text='all' count={total} />
				<StatisticLine text='average' count={(good - bad) / total} />
				<StatisticLine text='positive' count={good / total * 100} sign='%' />
			</div>
	)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
		<h1>give feedback</h1>
		<Button handleClick={handleGoodClick} text='good' />
		<Button handleClick={handleNeutralClick} text='neutral' />
		<Button handleClick={handleBadClick} text='bad' />
		<h1>statistics</h1>
		<Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
