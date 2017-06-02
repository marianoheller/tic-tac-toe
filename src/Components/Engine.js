

const MAX_VALUE = 99999999;
let cont = 0;

export default class Engine {
	
	constructor({ board, huPlayer, aiPlayer }) {
		this.board = board;
		this.huPlayer = huPlayer;
		this.aiPlayer = aiPlayer;
		//console.log("Engine initialized:", this.board, this.aiPlayer,this.huPlayer);
	}
	
	playerWon( board, player )  {
		if (
			(board[0] === player && board[1] === player && board[2] === player) ||
			(board[3] === player && board[4] === player && board[5] === player) ||
			(board[6] === player && board[7] === player && board[8] === player) ||
			(board[0] === player && board[3] === player && board[6] === player) ||
			(board[1] === player && board[4] === player && board[7] === player) ||
			(board[2] === player && board[5] === player && board[8] === player) ||
			(board[0] === player && board[4] === player && board[8] === player) ||
			(board[2] === player && board[4] === player && board[6] === player)
		) {
			return true;
		} 
		else {
			return false;
		}
	}
	
	getEmptyIndexies( board )   {
		return  board.filter(s => s !== this.huPlayer && s !== this.aiPlayer);
	}
	
	isMovesLeft(board) {
		return this.getEmptyIndexies(board).length !== 0;
	}
	
	evaluate(board) {
		if ( this.playerWon(board, this.huPlayer) ){
			return -10;
		}
		else if ( this.playerWon( board, this.aiPlayer ) ) {
			return +10;
		}
		else {
			return 0;
		}
	}
	
	minimax( board, depth, isMaximizingPlayer ) {
		console.log(++cont);
		const score = this.evaluate(board);
		
		if( Math.abs(score) === 10 ) {
			return score;
		}
		
		if (  !this.isMovesLeft(board) ) {
			return 0;
		}

		let bestVal = MAX_VALUE;
		let leftMoves = this.getEmptyIndexies(board);
		
		if( isMaximizingPlayer ) {
			bestVal *= (-1);
			
			leftMoves.forEach( function(move) {
				board[move] = this.aiPlayer;
				const value = this.minimax(board, depth+1, false)
				bestVal = Math.max( bestVal, value) 
				board[move] = move;
			}, this);  
			return bestVal
		}
		else {			
			
			leftMoves.forEach( function(move) {
				board[move] = this.huPlayer;
				const value = this.minimax(board, depth+1, false)
				bestVal = Math.min( bestVal, value);
				board[move] = move;
			}, this);  
			return bestVal
		}
	}
	
	findBestMove()
	{
		const board = Array.from(this.board);
		let bestVal = (-1)*MAX_VALUE;
		let bestMove;
		
		// Traverse all cells, evalutae minimax function for
		// all empty cells. And return the cell with optimal
		// value.
		var leftMoves = this.getEmptyIndexies(board);
		
		leftMoves.forEach( (move) => {
			board[move] = this.aiPlayer;
					
			const moveVal = this.minimax(board, 0, false);
			
			// Undo the move
			board[move] = move;
			
			// If the value of the current move is
			// more than the best value, then update
			// best/
			if (moveVal > bestVal) {
				bestMove = move;
				bestVal = moveVal;
			}
		});
		return bestMove;
	}
}