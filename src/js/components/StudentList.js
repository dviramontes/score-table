import React from 'react';
import StudentRow from './StudentRow';

var StudentList = React.createClass({
	render:function(){
		var studentList = this.props.students.map((student) => {
			return (<StudentRow key={student._id} fname={student.fname} lname={student.lname} score={student.score}/>);
		});
		return(<tbody>{studentList}</tbody>);
	}
});

export default StudentList;