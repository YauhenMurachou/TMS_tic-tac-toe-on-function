import React from "react";

import './Square.css'

function Square({ finishSquare, position, value, onClick }) {

	const handleClick = () => {
		onClick(position)
	};


	return (
		<button
			className={finishSquare ? "square-active" : "square"}
			onClick={handleClick}
		>
			{value}
		</button>
	);
}


export default Square;
