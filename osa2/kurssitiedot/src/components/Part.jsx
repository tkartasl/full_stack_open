const Part = (props) => {
	return (
		<div>
			{props.parts.map(part => 
			<p key={part.name}>{part.name} {part.exercises}</p>
		)}
		</div>
	)
}

export default Part