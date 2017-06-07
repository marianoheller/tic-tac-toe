import React, { Component } from 'react';

import { processGameStep } from './GameEngine';
import Board from './Board';
import Start from './Start';




export default class TicTacToe extends Component {
	
	constructor(props) {
		super(props);
		
		const origBoard = (new Array(9)).fill(0).map( (e,i) => i);
		// var origBoard = ["O",1,"X","X",4,"X",6,"O","O"];
		//var origBoard = [0, 1, 2, 3, "O", 5, 6, 7 ,9];
		this.state = {
			started: false,
			puntaje: {
				huPlayer: 0,
				aiPlayer: 0
			},
			board: origBoard,
			huPlayer: "O",
			aiPlayer: "X"
		}
	}
	
	
	
	
	updateBoard(board) {
		const symbols = {
			huPlayer: this.state.huPlayer,
			aiPlayer: this.state.aiPlayer
		};
		const gameState = processGameStep(board, symbols);

		const newBoard = gameState.board;
		const newState = {
			...this.state,
			board: newBoard
		};
		if( gameState.winner !== null ) {
			newState.puntaje[gameState.winner] = this.state.puntaje[gameState.winner] + 1;
		}
		console.log(newState.puntaje);
		this.setState( newState );
	}

	startGame() {
		this.setState( {
			...this.state,
			started: true
		});
	}
	
	
	render() {
		const { board, started } = this.state;
		const symbols = {
			huPlayer:this.state.huPlayer, 
			aiPlayer: this.state.aiPlayer
		};

		let Game = <Start onStart={this.startGame.bind(this)}></Start>
		if ( started ) {
			Game = <Board 
			puntaje={this.state.puntaje} 
			updateBoard={this.updateBoard.bind(this)} 
			board={board} 
			symbols={symbols}>
			</Board>
		}

		return (
		<div className="pure-g">
			<div className="pure-u-6-24"></div>
			<div className="pure-u-12-24">
				{Game}
			</div>
			<div className="pure-u-6-24"></div>
		</div>
		)
	}
}
