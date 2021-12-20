import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Square from "./components/Square";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const findNextValue = (squares) => {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  };
  const nextValue = findNextValue(squares);
  const selectSquare = (square) => {
    if (squares[square] || winner) return;
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  };
  const calcualateWinner = (squares) => {
    const winningLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningLogic.length; ++i) {
      const [a, b, c] = winningLogic[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winnerInfo: [a, b, c],
        };
      }
    }
    return { winner: null, winnerInfo: null };
  };
  const info = calcualateWinner(squares);
  const { winner, winnerInfo } = info;
  const showWinner = (winner, squares) => {
    return winner && squares.filter(Boolean).length > 0
      ? `The player ${winner} win the game`
      : squares.filter(Boolean).length === 9
      ? "The game is draw"
      : "We don't get any winner yet";
  };
  const status = showWinner(winner, squares);
  const restartGame = () => {
    setSquares(Array(9).fill(null));
  };
  const getClassName = (pos) => {
    return (pos.includes(0) && pos.includes(1) && pos.includes(2)) ||
      (pos.includes(5) && pos.includes(4) && pos.includes(3)) ||
      (pos.includes(6) && pos.includes(7) && pos.includes(8))
      ? "horizon-line"
      : pos.includes(0) && pos.includes(4) && pos.includes(8)
      ? "cross-line1"
      : pos.includes(6) && pos.includes(4) && pos.includes(2)
      ? "cross-line2"
      : "vertical-line";
  };
  const className = winnerInfo ? getClassName(winnerInfo) : "";
  console.log(winnerInfo ? winnerInfo : "null");
  console.log(className);
  return (
    <div className="App">
      <h2>React Tic-Tac-Toe Game</h2>
      <Board>
        {squares.map((square, i) => {
          return (
            <Square
              key={i}
              value={square}
              className={
                winner && winnerInfo && winnerInfo.includes(i) ? className : ""
              }
              onClick={() => {
                selectSquare(i);
              }}
            >
              {square}
              {i}
            </Square>
          );
        })}
      </Board>
      {status && <h2 style={{ marginBottom: "10px" }}>{status}</h2>}
      <button
        onClick={() => {
          restartGame();
        }}
        style={{
          width: "100px",
          height: "40px",
          borderRadius: "10px",
          fontSize: "20px",
          backgroundColor: "#565343",
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
