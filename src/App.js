import React, { Component } from 'react';
import Engine from './Components/Engine';
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

    //const origBoard = (new Array(9)).fill(0).map( (e,i) => i);
    var origBoard = ["O",1,"X","X",4,"X",6,"O","O"];
    //var origBoard = [0, 1, 2, 3, "O", 5, 6, 7 ,9];
    this.state = {
      board: origBoard,
      huPlayer: "O",
      aiPlayer: "X"
    }
  }

  doBestMove() {
    console.log("Old board: ", this.state.board);

    const copyState = Object.assign({},this.state);
    const bestMove = (new Engine(copyState)).findBestMove();

    const newBoard = Array.from(this.state.board);
    newBoard[bestMove] = this.state.aiPlayer;

    console.log("NewBoard: ", newBoard);

    // this.setState( {
    //   ...this.state,
    //   board: newBoard
    // });
  }

  componentWillMount(){
    this.doBestMove();
  }


  render() {
    return (
      <div>

      </div>
    )
  }
}

export default App;
