import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { Context } from "../Game/Game";
import './Square.css';

function Square({ position, value, winSquare }) {

	const { clickSquare } = useContext(Context);

	const handleClick = () => {
		clickSquare(position)
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
	winSquare: PropTypes.bool
}

export default Square;
