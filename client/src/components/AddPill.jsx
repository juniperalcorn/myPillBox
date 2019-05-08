import React, {Component} from 'react';
import {withRouter} from 'react-router'

class AddPill extends Component {
  constructor(props){
      super(props)
      this.state={
      }
  }

  render(){
    return (
        <div className="add-pill">
                <h2>Add new medication to Pill Box</h2>
                <select value={this.props.selectedPill.id} onChange={this.props.handleSelect}>
                    <option value=''>Select a medication</option>
                    {this.props.pills.map((pill)=>(
                        <option key={pill.id} value={pill.id}>{pill.name}, {pill.mg}mg</option>
                    ))}

                </select>
            <form onSubmit={this.props.newDose}>

                <p className='add-pill-label'>Morning Dose: <input 
                    className='add-pill-input' 
                    name='am_dose' 
                    type='text' 
                    placeholder='Number of Pills' 
                    value={this.props.selectedPill.AM} 
                    onChange={this.props.handleChange}>
                </input></p>               
                <p className='add-pill-label'>Midday Dose: <input 
                    className='add-pill-input' 
                    name='mid_dose' 
                    type='text' 
                    placeholder='Number of Pills' 
                    value={this.props.selectedPill.Mid} 
                    onChange={this.props.handleChange}>
                </input></p>  
                <p className='add-pill-label'>Evening Dose: <input 
                    className='add-pill-input' 
                    name='pm_dose' 
                    type='text' 
                    placeholder='Number of Pills' 
                    value={this.props.selectedPill.PM} 
                    onChange={this.props.handleChange}>
                </input></p>
                <p className='add-pill-label'> Bed Dose: <input 
                    className='add-pill-input' 
                    name='bed_dose' 
                    type='text' 
                    placeholder='Number of Pills' 
                    value={this.props.selectedPill.Bed} 
                    onChange={this.props.handleChange}>
                </input></p>
                
                <br/>
                <button id='submitNew'>Submit</button>
           
            </form>
        </div>
    );
  }
}

export default withRouter(AddPill);