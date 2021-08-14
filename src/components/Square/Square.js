import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { Context } from "../Game/Game";
import './Square.css';

function Square({ position, winSquare }) {

	const { clickSquare, currentSquares } = useContext(Context);

	const handleClick = () => {
		clickSquare(position)
	};

	return (
		<button
			className={winSquare ? "square-active" : "square"}
			onClick={handleClick}
		>
			{currentSquares[position]}
		</button>
	);
}

Square.propTypes = {
	position: PropTypes.number,	
	winSquare: PropTypes.bool
}

export default Square;
