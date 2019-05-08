import React, {Component} from 'react';
import {withRouter} from 'react-router'

class UpdateDose extends Component {
  constructor(props){
      super(props)
      this.state={
 
      }
   
  }

componentDidMount(){
  this.props.getPillId()
}

  render(){
    return (
        <div className="updateDose">

            <form onSubmit={this.props.newDose}>

                <p>Morning Dose:</p>
                <input name='am_dose' type='text' placeholder='Number of Pills' value={this.props.selectedPill.AM} onChange={this.props.handleChange}></input>
                <p>Mid-day Dose:</p>
                <input name='mid_dose' type='text' placeholder='Number of Pills' value={this.props.selectedPill.Mid} onChange={this.props.handleChange}></input>
                <p>PM Dose:</p>
                <input name='pm_dose' type='text' placeholder='Number of Pills' value={this.props.selectedPill.PM} onChange={this.props.handleChange}></input>
                <p>Bed Dose:</p>
                <input name='bed_dose' type='text' placeholder='Number of Pills' value={this.props.selectedPill.Bed} onChange={this.props.handleChange}></input>
                <br/>
                <button>Submit</button>
           
            </form>
        </div>
    );
  }
}

export default withRouter(UpdateDose);