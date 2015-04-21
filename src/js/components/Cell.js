import React from 'react';
import fetch from 'fetch';

// <TD/> editable cell component
// **

var Cell = React.createClass({
	getInitialState: function () {
		return {
			isEditable: false,
			data: null,
			cellType: this.props.cellType
		};
	},
	componentWillMount: function () {
		this.setState({
			isEditable: this.props.isEditable,
			data: this.props.data
		});
	},
	handleEdit: function () {
		this.setState({isEditable: true});
	},
	handleChange: function (e, i) {
		this.setState({data: e.target.value});
	},
	handleKeyDown: function (e, i) {
		switch (e.keyCode) {
			case 13: // enter-key
				this.setState({
					isEditable: false
				});
				var _id = i.split("$")[1].split(".")[0];
				window.fetch('http://localhost:4000/api/update', {
					method: 'put',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						id: _id,
						data: this.state.data,
						type: this.props.cellType
					})
				});
				break;
			case 9:
				this.setState({isEditable: false});
				break;
		}
	},
	render: function () {
		var cell;
		if (this.state.isEditable) {
			cell = <input type="text" value={this.state.data} onChange={this.handleChange}
			              onKeyDown={this.handleKeyDown} cellType={this.props.cellType} required/>;
		} else {
			if (this.state.cellType === 'score' && this.state.data < 65) {
				cell = <div onClick={this.handleEdit} style={{ backgroundColor : "red", paddingLeft : "5px", color : 'white' }}>{this.state.data}</div>
			} else {
				cell = <div onClick={this.handleEdit}>{this.state.data}</div>
			}
		}
		return (<td>{cell}</td>);
	}
});

export default Cell;