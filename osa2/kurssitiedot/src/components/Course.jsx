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

const Part = (props) => {
	return (
		<div>
			{props.parts.map(part => 
			<p key={part.name}>{part.name} {part.exercises}</p>
		)}
		</div>
	)
}

const Header = ({ course }) => {
	return (
		<div>
			<h2>{course}</h2>
		</div>
	)
}

const Content = ({ course }) =>{
	return (
		<div>
			<Part parts={course} />
		</div>
	)
}

const Course = ({ courses }) => {
	return (
		<div>
			{courses.map((course) => (
				<div key={course.id}>
					<Header course={course.name} />
					<Content course={course.parts} />
					<Total parts={course.parts} />
				</div>	
			))}
			
		</div>
	)
}

export default Course