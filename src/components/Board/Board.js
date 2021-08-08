import React from "react";
import Square from "../Square/Square";
import PropTypes from 'prop-types';
import './Board.css';


function Board({ winCombination, squares, handleClickSquare, currentStepNumber, history }) {

	const renderSquare = (i) => {
		let finishSquare;
		winCombination.map((a) => {
			if (a === i) {
				return (finishSquare = true);
			}
		});
		return (
			<Square
				winSquare={finishSquare &&
					currentStepNumber === history.length - 1}
				position={i}
				value={squares[i]}
				onClick={handleClickSquare}
			/>
		);
	}


	return (
		<div>
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	);
}

Board.propTypes = {
	history: PropTypes.array,
	currentStepNumber: PropTypes.number,
	winCombination: PropTypes.array,
	squares: PropTypes.array,
	handleClickSquare: PropTypes.func
}

export default Board;
