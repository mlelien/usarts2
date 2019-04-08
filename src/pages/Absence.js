import React, {Component} from 'react';

class Absence extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      // form details?
		};
	}

	render() {
		return (
			<div>
        <div> hello this is absence </div>
				<p><a href="/absence-pending">pending</a></p>
        <p><a href='/absence-confirmation'>confirmation</a></p>
      </div>
		);
	}
}

export default Absence;
