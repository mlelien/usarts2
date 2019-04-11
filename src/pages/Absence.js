import React, {Component} from 'react';
import '../css/styles.css'

class Absence extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      // form details?
		};
	}

	render() {
		return (
  		<div class="container">
				<div class="title">Mark an Absence</div>
				<p><a href="/absence-pending">pending</a></p>
        <p><a href='/absence-confirmation'>confirmation</a></p>
      </div>
		);
	}
}

export default Absence;
