import React, { useState } from "react";
import Board from '../Board/Board';
import './Game.css'

function Game() {

	const [history, setHistory] = useState([{ squares: Array(9).fill("") }]);
	const [nextStep, setNextStep] = useState("X");
	const [currentStepNumber, setCurrentStepNumber] = useState(0);
	const [isFinish, setIsFinish] = useState(false);
	const [winCombination, setWinCombination] = useState([]);

	const calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				setWinCombination(lines[i]);
				return true;
			}
		}
		return false;
	}

	const clickSquare = (i) => {
		const currentSquaresCopy = [...history[history.length - 1].squares];
		let isFinishLocal;
		if (currentSquaresCopy[i] === "" && !isFinish) {
			currentSquaresCopy[i] = nextStep;
			isFinishLocal = calculateWinner(currentSquaresCopy);
			setHistory(history.concat({ squares: currentSquaresCopy }));
			setNextStep(isFinish ? nextStep : nextStep === "X" ? "0" : "X");
			setCurrentStepNumber(history.length);
			setIsFinish(isFinishLocal);
		}
	}

	const finishButton = () => {
		console.log("finishButton");

		setHistory([{ squares: Array(9).fill("") }]);
		setNextStep("X");
		setCurrentStepNumber(0);
		setIsFinish(false);
		setWinCombination([]);

	}

	const showFinishButton = () => {

		if (isFinish || history.length === 10) {
			return (
				<button className="new-btn" onClick={() => finishButton()}>
					Start new game
				</button>
			);
		}
	}

	const jumpTo = (step) => {
		setCurrentStepNumber(step);
		setWinCombination([]);
	}


	const showButtonsHistory = () => {
		return history.map((item, index) => {
			if (index > 0) {
				return (
					<li key={index}>
						<button
							className={
								index === currentStepNumber
									? "btn-active"
									: "btn-non-active"
							}
							onClick={() => jumpTo(index)}
						>
							Перейти на ход {index}
						</button>
					</li>
				);
			}
		});
	}



	let status;
	if (isFinish) {
		status = "Game over. Winner is " + nextStep;
	} else {
		status = "Next player: " + nextStep;
	}

	const currentSquares = history[currentStepNumber].squares;

	return (
		<div>
			<div className="game">
				<div className="game-board">
					<div className="status">{status}</div>
					<Board
						winCombination={winCombination}
						squares={currentSquares}
						handleClickSquare={clickSquare}
					/>
				</div>
				<div className="game-info">
					<ul>{showButtonsHistory()}</ul>
				</div>
			</div>
			<footer>{showFinishButton()}</footer>
		</div>
	);
}


export default Game;
