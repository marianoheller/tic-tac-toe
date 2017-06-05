import React, { Component } from 'react';




export class Board extends Component {

    boardChanged(value) {
        const { board, symbols, updateBoard } = this.props;
        board[value] = symbols.huPlayer;
        updateBoard(board);
    }


    render() {
        const { board } = this.props;
        const casilleros = (new Array(9)).fill(0).map( (e,i) => 
            <Casillero 
                key={i}
                value={board[i]} 
                symbols={this.props.symbols}
                onBoardChanged={this.boardChanged.bind(this)} >
            </Casillero>
        ); 

        return (
            <div className="pure-g board-container">
                {casilleros}                
            </div>
        )
    }
}

export class Casillero extends Component {

    handleClick(e) {
        const { symbols, value, onBoardChanged } = this.props
        if( Object.keys(symbols).some( (key) => symbols[key]===value) ){   return;   }
        onBoardChanged(value);
    }

    render() {
        return (
            <div className="pure-u-8-24">
                <div onClick={this.handleClick.bind(this)} className="casillero-container no-select">
                    {this.props.value}
                </div>
            </div>
        )
    }
}