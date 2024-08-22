const Total = ({ parts }) => {
	let total = 0
	for (let i = 0; i < parts.length; i++)
		total += parts[i].exercises
	
	return (
		<div>
			<h4>total of {total} exercises</h4>
		</div>
	)
}

export default Total