import React, { Component } from 'react';


export default class Start extends Component {

	constructor(props) {
		super(props);

		this.state = {
			difficulty: this.props.difficulty,
			symbol: this.props.symbols.huPlayer
		}
	}

	handleChangeDifficulty(event) {
		this.setState({
			...this.state,
			difficulty: event.target.value
		});
	}
	handleChangeSymbol(event) {
		this.setState({
			...this.state,
			symbol: event.target.value
		})
	}

	handleSubmit() {
		const { onStart: startGame } = this.props;
		const { difficulty, symbol } = this.state;
		startGame( difficulty, symbol );
	}
	
	render() {
		return (
		<div className="pure-g start-container">
			<div className="pure-u-1">
				
				<form onSubmit={this.handleSubmit.bind(this)} className="pure-form">

					<div className="pure-g">
						<div className="pure-u-1">
							<div className="pure-g difficulty-container">
								<div className="pure-u-1-2">
									Choose difficulty:							
								</div>
								<div className="pure-u-1-2">
									
									<label htmlFor="option-difficulty-1" className="pure-radio">
										<input id="option-difficulty-1" 
										type="radio" 
										name="optionDifficulty" 
										value="Easy" 
										checked={this.state.difficulty === "Easy"}
										onChange={this.handleChangeDifficulty.bind(this)}/>
										Easy
									</label>

									<label htmlFor="option-difficulty-2" className="pure-radio">
										<input id="option-difficulty-2" 
										type="radio" 
										name="optionDifficulty" 
										value="Normal" 
										checked={this.state.difficulty === "Normal"}
										onChange={this.handleChangeDifficulty.bind(this)}/>
										Normal
									</label>

									<label htmlFor="option-difficulty-3" className="pure-radio">
										<input id="option-difficulty-3" 
										type="radio" 
										name="optionDifficulty" 
										value="Hard" 
										checked={this.state.difficulty === "Hard"}
										onChange={this.handleChangeDifficulty.bind(this)}/>
										Hard
									</label>
								</div>
							</div>
						</div>

						<div className="pure-u-1">
							<div className="pure-g symbols-container">
								<div className="pure-u-1-2">
									Choose symbol:
								</div>
								<div className="pure-u-1-2">
									<label htmlFor="option-symbol-hu" className="pure-radio">
										<input id="option-symbol-hu" 
										type="radio" 
										name="optionsSymbols" 
										value={this.props.symbols.huPlayer}
										checked={this.state.symbol === this.props.symbols.huPlayer}
										onChange={this.handleChangeSymbol.bind(this)}/>
										{this.props.symbols.huPlayer}
									</label>
									<label htmlFor="option-symbol-ai" className="pure-radio">
										<input id="option-symbol-ai" 
										type="radio" 
										name="optionsSymbols" 
										value={this.props.symbols.aiPlayer} 
										checked={this.state.symbol === this.props.symbols.aiPlayer}
										onChange={this.handleChangeSymbol.bind(this)}/>
										{this.props.symbols.aiPlayer}
									</label>
								</div>
							</div>
						</div>
					</div>

					<button type="submit" className="pure-button start-game-button ">Start Game</button>
				</form>
				
			</div>
		</div>
		)
	}
}