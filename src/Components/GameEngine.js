

const MAX_VALUE = 99999999;

export function ComputerMove ( board , symbols) {

	const { huPlayer, aiPlayer } = symbols;
	
	
	function evaluate() {
		if ( AIHelpers.playerWon(board, huPlayer) ){
			return -10;
		}
		else if ( AIHelpers.playerWon(board, aiPlayer ) ) {
			return +10;
		}
		else {
			return 0;
		}
	}
	
	function minimax( depth, isMaximizingPlayer ) {
		const score = evaluate();
		
		if( Math.abs(score) === 10 ) {
			return score;
		}
		
		if (  !AIHelpers.isMovesLeft(board, symbols) ) {
			return 0;
		}

		let bestVal = MAX_VALUE;
		let leftMoves = AIHelpers.getEmptyIndexies(board, symbols);
		
		if( isMaximizingPlayer ) {
			bestVal *= (-1);
			
			leftMoves.forEach( function(move) {
				board[move] = aiPlayer;
				const value = minimax( depth+1, false)
				bestVal = Math.max( bestVal, value) 
				board[move] = move;
			});  
			return bestVal
		}
		else {			
			
			leftMoves.forEach( function(move) {
				board[move] = huPlayer;
				const value = minimax( depth+1, true)
				bestVal = Math.min( bestVal, value);
				board[move] = move;
			});  
			return bestVal
		}
	}
	
	function findBestMove()
	{
		let bestVal = (-1)*MAX_VALUE;
		let bestMove = undefined;
		
		// Traverse all cells, evalutae minimax function for
		// all empty cells. And return the cell with optimal
		// value.
		var leftMoves = AIHelpers.getEmptyIndexies(board, symbols);
		
		leftMoves.forEach( (move) => {
			// Do the move
			board[move] = aiPlayer;
			
			// Calculate val of move
			const moveVal = minimax( 0, false);
			
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

	return findBestMove();
}

export class AIHelpers {
	static playerWon(board, player )  {
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

	static isGameFinished(board, symbols) {
		if ( !this.isMovesLeft(board, symbols) ) {
			return true;
		}
		const { huPlayer, aiPlayer } = symbols;
		if( this.playerWon(board, huPlayer ) ||  this.playerWon(board, aiPlayer )) {
			return true;
		}
		return false;
	}
	
	static getEmptyIndexies(board, symbols)   {
		const { huPlayer, aiPlayer } = symbols;
		return  board.filter(s => s !== huPlayer && s !== aiPlayer);
	}
	
	static isMovesLeft(board, symbols) {
		return this.getEmptyIndexies(board, symbols).length !== 0;
	}
}



export function processGameStep(board, symbols) {

	const gameState = {
		winner: null,
		board: null
	};

	function computeAIAfterBoard() {
		
		const bestMove = ComputerMove(board, symbols);

		if ( bestMove === undefined ) {   return (new Array(9)).fill(0).map( (e,i) => i);   }
		const newBoard = Array.from(board);
		newBoard[bestMove] = symbols.aiPlayer;
		
		return newBoard;	
	}

	//Check if player won or no moves left
	if ( AIHelpers.isGameFinished(board, symbols) ) {
		const winner = AIHelpers.playerWon(board, symbols.huPlayer ) ? "huPlayer" : null;
		const newBoard = (new Array(9)).fill(0).map( (e,i) => i);
		
		gameState.board = newBoard;
		gameState.winner = winner;
	}
	//Else move computer
	else {
		const boardAIAfter = computeAIAfterBoard(board);
		if ( AIHelpers.isGameFinished(boardAIAfter, symbols) ) {
			const winner = AIHelpers.playerWon(boardAIAfter, symbols.aiPlayer ) ? "aiPlayer" : null;
			const newBoard = (new Array(9)).fill(0).map( (e,i) => i);
			
			gameState.board = newBoard;
			gameState.winner = winner;
		}
		else {
			gameState.board = boardAIAfter;
		}
	}
	return gameState;

}