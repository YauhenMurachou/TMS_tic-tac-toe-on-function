import React, { useState } from "react";
import Board from '../Board/Board';
import './Game.css'

export const Context = React.createContext();

function Game() {

	const [history, setHistory] = useState([{ squares: Array(9).fill("") }]);
	const [nextStep, setNextStep] = useState('X');
	let [currentStep, setCurrentStep] = useState('');
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
			setCurrentStep((nextStep === "X") ? currentStep = 'X' : currentStep = '0')
			setCurrentStepNumber(history.length);
			setIsFinish(isFinishLocal);
		}
	}
	console.log(currentStep)
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
							?????????????? ???? ?????? {index}
						</button>
					</li>
				);
			}
		});
	}


	let status;
	if (isFinish) {
		status = "Game over. Winner is " + currentStep;
	} else if (history.length === 10) {
		status = "No winner today"
	}
	else {
		status = "Next player: " + nextStep;
	}

	const currentSquares = history[currentStepNumber].squares;
	const contextValue = { clickSquare, currentSquares };

	return (
		<Context.Provider value={contextValue}>
			<div>
				<div className="game">
					<div className="game-board">
						<div className="status">{status}</div>
						<Board
							winCombination={winCombination}
							history={history}
							currentStepNumber={currentStepNumber}
						/>
					</div>
					<div className="game-info">
						<ul>{showButtonsHistory()}</ul>
					</div>
				</div>
				<footer>{showFinishButton()}</footer>
			</div>
		</Context.Provider>
	);
}


export default Game;
