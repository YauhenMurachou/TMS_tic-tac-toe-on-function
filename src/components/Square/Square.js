import React from "react";
import PropTypes from 'prop-types';
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

Square.propTypes = {
	position: PropTypes.number,
	value: PropTypes.string,
	winSquare: PropTypes.bool,
	onClick: PropTypes.func
}

export default Square;
