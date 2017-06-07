import React, { Component } from 'react';


export default class Start extends Component {

	handleClick() {
		const { onStart: startGame } = this.props;
		startGame();
	}
	
	render() {
		return (
		<div className="pure-g">
			<div className="pure-u-1">
				<button onClick={this.handleClick.bind(this)} className="button-xlarge button-success pure-button">A Pure Button</button>
			</div>
		</div>
		)
	}
}