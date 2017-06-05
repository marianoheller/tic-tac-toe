import React, { Component } from 'react';
import Engine from './Components/Engine';
import { Board } from './Components/Board';
import './App.css';




class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="pure-u-1">
            <TicTacToe></TicTacToe>
          </div>
        </div>
      </div>
    );
  }
}


class TicTacToe extends Component {

  constructor(props) {
    super(props);

    const origBoard = (new Array(9)).fill(0).map( (e,i) => i);
    // var origBoard = ["O",1,"X","X",4,"X",6,"O","O"];
    //var origBoard = [0, 1, 2, 3, "O", 5, 6, 7 ,9];
    this.state = {
      board: origBoard,
      huPlayer: "O",
      aiPlayer: "X"
    }
  }

  bestAIMove(currentState) {
    // console.log("Old board: ", currentState);

    const bestMove = (new Engine(currentState)).findBestMove();
    const newBoard = Array.from(currentState.board);
    newBoard[bestMove] = currentState.aiPlayer;

    // console.log("NewBoard: ", newBoard);
    return newBoard;
  }


  updateBoard(board) {

    //Calculate AI move
    const newBoard = this.bestAIMove({
      ...this.state,
      board: board
    });

    this.setState( {
      ...this.state,
      board: newBoard
    })
  }


  render() {
    const { board } = this.state;
    const symbols = {
      huPlayer:this.state.huPlayer, 
      aiPlayer: this.state.aiPlayer
    };
    return (
      <div className="pure-g">
        <div className="pure-u-6-24"></div>
        <div className="pure-u-12-24">
          <Board updateBoard={this.updateBoard.bind(this)} board={board} symbols={symbols}></Board>
        </div>
        <div className="pure-u-6-24"></div>
      </div>
    )
  }
}


export default App;
