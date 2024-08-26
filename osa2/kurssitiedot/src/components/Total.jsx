const Total = ({ parts }) => {
	const totalExercises = parts.reduce(
		(previousValue, currentValue) => previousValue + currentValue.exercises, 0
);
	return (
		<div>
			<h4>total of {totalExercises} exercises</h4>
		</div>
	)
}

export default Total