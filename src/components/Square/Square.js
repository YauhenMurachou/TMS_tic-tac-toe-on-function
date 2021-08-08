import React from "react";

import './Square.css'

function Square({ winSquare, position, value, onClick }) {

	const handleClick = () => {
		onClick(position)
	};


	return (
		<button
			className={winSquare ? "square-active" : "square"}
			onClick={handleClick}
		>
			{value}
		</button>
	);
}


export default Square;
