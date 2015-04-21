import React from 'react';
import Cell from './Cell';

var StudendRow = React.createClass({
	getInitialState: function () {
		return {data: this.props.data};
	},
	render: function () {
		return (<tr>
			<Cell data={this.props.fname} cellType="fname"/>
			<Cell data={this.props.lname} cellType="lname"/>
			<Cell data={this.props.score} cellType="score"/>
		</tr>);
	}
});

export default StudendRow;