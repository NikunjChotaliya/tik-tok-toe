import React, { useState } from 'react';
import { PLAYERS } from '../utils/constant';

const gameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
function Game() {

  let [boardElem, setBoardElem] = useState({
    player: PLAYERS.x,
    elements: new Array(gameArr.length),
    winnerPlayer: ''
  });

  const setGameBoard = (index) => {
    if (!boardElem.elements[index]) {
      let tempElemets = boardElem.elements;
      let currentPlayer = boardElem.player === PLAYERS.x ? PLAYERS.o : PLAYERS.x;
      tempElemets[index] = currentPlayer;
      let winnerPlayer = checkWinner(tempElemets, index);

      setBoardElem({
        player: boardElem.player === PLAYERS.x ? PLAYERS.o : PLAYERS.x,
        elements: tempElemets,
        winnerPlayer
      });
    }
  }

  function checkWinner(elements) {
    let winnerPossibility = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];
    let winnerPlayer = '';
    for (let i = 0; i < winnerPossibility.length; i++) {
      let [elem1, elem2, elem3] = winnerPossibility[i];
      if (
        elements[elem1] &&
        elements[elem1] === elements[elem2] &&
        elements[elem2] === elements[elem3]
      ) {
        winnerPlayer = elements[elem1];
        break;
      }
    }
    return winnerPlayer;
  }

  const resetGame = () => {
    setBoardElem({
      player: PLAYERS.x,
      elements: new Array(gameArr.length),
      winnerPlayer: ''
    });
  }

  const renderSquare = (index) => {
    return (
      <button
        key={index}
        className="square"
        onClick={() => setGameBoard(index)}
      >
        {boardElem.elements[index]}
      </button>
    )
  }

  return (
    <div>
      <h3>Winner is: {boardElem.winnerPlayer || 'None'}</h3>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="buttton" onClick={() => resetGame()}>Start new game</button>
    </div>
  )

}

export default Game;