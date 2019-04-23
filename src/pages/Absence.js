import React, { Component } from 'react'
import '../css/Absence.css'
import '../css/styles.css'

class Absence extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // form details?
    }
  }

	render() {
   	return (
      	<div className="container">
       		<div className="title">Mark an Absence</div>
        		<form>
      			<div className='row'>
					<div className='row-item'>
						<label className='input-group'>
						<span>Absence Date</span>
							<input
								className='input'
								type='text'
							/>
					</label>
					</div>
					<div className='row-item'>
						<div className='input-group'>
							<span>Location</span>
							<label>
								<input 
									type='radio' 
									className='radio-button'
								/>
								<span>Fairfax</span>
							</label>
							<label>
								<input 
									type='radio' 
									className='radio-button'
								/>
								<span>Chantilly</span>
							</label>
						</div>
				  	</div>
          </div>
					<div className='row'>
						<div className='row-item'>
						<label className='input-group'>
							<span>Last Name</span>
							<input
								className='input'
								type='text'
							/>
						</label>
				  	</div>
						<div className='row-item'>
						<label className='input-group'>
							<span>First Name</span>
							<input
								className='input'
								type='text'
							/>
						</label>
				  	</div>
					  	<div className='row-item'>
						<label className='input-group'>
							<span>Student ID (optional)</span>
							<input
								className='input'
								type='text'
							/>
						</label>
				  	</div>
					</div>
					<div className='row'>
						<div className='row-item'>
							<label className='input-group'>
								<span>Room #</span>
								<select className='input'>
									<option>112</option>
									<option>113</option>
								</select>
							</label>
						</div>
						<div className='row-item'>
							<label className='input-group'>
								<span>Class Time</span>
								<select className='input'>
									<option>10:00 AM</option>
									<option>11:00 AM</option>
								</select>
							</label>
						</div>
						<div className='row-item'>
							<label className='input-group'>
								<span>School pickup (optional)</span>
								<span className='subtitle'>If your child usually gets picked up from school, please select the school here:</span>
								<select className='input'>
									<option>Rachel Carson</option>
									<option>Holmes</option>
								</select>
							</label>
						</div>
					</div>
					<button type='button'>+ add child</button>
				</form>
        	<p><a href="/absence-pending">pending</a></p>
        	<p><a href='/absence-confirmation'>confirmation</a></p>
      </div>
    )
  }
}

export default Absence
