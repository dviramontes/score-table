import React from 'react';
import StudentList from './StudentList';
import _ from 'lodash';

var StudentTable = React.createClass({
	getInitialState: function () {
		return {
			students: this.props.data
		};
	},
	render: function () {
		return (
			<table className="table">
				<thead>
				<tr>
					<th>first</th>
					<th>last</th>
					<th>score</th>
				</tr>
				</thead>
				<StudentList students={this.props.students}/>
			</table>
		);
	}
});

export default StudentTable;