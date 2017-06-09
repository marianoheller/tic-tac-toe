import React, { Component } from 'react';



export default class Board extends Component {

    boardChanged(value) {
        const { board, symbols, updateBoard } = this.props;
        board[value] = symbols.huPlayer;
        updateBoard(board);
    }


    render() {
        const { board, puntaje } = this.props;
        const casilleros = (new Array(9)).fill(0).map( (e,i) => 
            <Casillero 
                key={i}
                value={board[i]} 
                symbols={this.props.symbols}
                onBoardChanged={this.boardChanged.bind(this)} >
            </Casillero>
        );
        const scores = Object.keys(puntaje).map( (k,i) => <p key={i}>{k==="huPlayer" ? "You" : "Computer"}: {puntaje[k]}</p>)

        return (
            <div className="pure-g board-container">
                <div className="pure-u-1">
                    Difficulty: {this.props.difficulty}
                </div>
                <div className="pure-u-1">
                    {scores}
                </div>
                <div className="pure-u-1">
                    {casilleros}
                </div>
                <div className="pure-u-1 reset-button-container">
                    <button onClick={this.props.onReset} className="pure-button pure-button-primary reset-button">Table Flip!</button>
                </div>
            </div>
        )
    }
}

class Casillero extends Component {

    handleClick(e) {
        const { symbols, value, onBoardChanged } = this.props
        if( Object.keys(symbols).some( (key) => symbols[key]===value) ){   return;   }
        onBoardChanged(value);
    }

    render() {
        const { value } = this.props;
        const val = isNaN(value) ? value : " " ;
        return (
            <div className="pure-u-8-24">
                <div onClick={this.handleClick.bind(this)} className="casillero-container no-select">
                    { val }
                </div>
            </div>
        )
    }
}