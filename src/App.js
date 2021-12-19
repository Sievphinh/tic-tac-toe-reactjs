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
    console.log(squares);
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
          winnerInfo: [squares[a], squares[b], squares[c]],
        };
      }
    }
    return { winner: null, winnerInfo: null };
  };
  const info = calcualateWinner(squares);
  console.log(typeof info);
  const { winner, winnerInfo } = info;
  console.log(winnerInfo);
  const showWinner = (winner, squares) => {
    return winner && squares.filter(Boolean).length > 0
      ? `The player ${winner} win the game`
      : "The game is draw";
  };
  const status = showWinner(winner, squares);
  const restartGame = () => {
    setSquares(Array(9).fill(null));
  };
  return (
    <div className="App">
      <h2>Simple Tic-tac-toe game</h2>
      <Board>
        {squares.map((square, i) => {
          return (
            <Square
              key={i}
              value={square}
              onClick={() => {
                selectSquare(i);
              }}
            >
              {square}
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
          height: "60px",
          borderRadius: "10px",
          fontSize: "20px",
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
