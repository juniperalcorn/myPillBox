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
                
                <div className='add-pill-opt'> 
                    <span className='add-pill-label-span'>Morning Dose: </span>
                        <span className='add-pill-label-input'><input 
                        className='add-pill-input' 
                        name='am_dose' 
                        type='text' 
                        placeholder='Number of Pills' 
                        value={this.props.selectedPill.AM} 
                        onChange={this.props.handleChange}>
                        </input></span>
                </div>

                <div className='add-pill-opt'>           
                    <span className='add-pill-label-span'>Midday Dose:</span> 
                        <span className='add-pill-label-input'><input 
                        className='add-pill-input' 
                        name='mid_dose' 
                        type='text' 
                        placeholder='Number of Pills' 
                        value={this.props.selectedPill.Mid} 
                        onChange={this.props.handleChange}>
                        </input></span> 
                </div>

                <div className='add-pill-opt'>
                    <span className='add-pill-label-span'>Evening Dose:</span> 
                        <span className='add-pill-label-input'><input 
                        className='add-pill-input' 
                        name='pm_dose' 
                        type='text' 
                        placeholder='Number of Pills' 
                        value={this.props.selectedPill.PM} 
                        onChange={this.props.handleChange}>
                        </input></span>
                </div>

                <div className='add-pill-opt'>
                    <span className='add-pill-label-span'>Bed Dose: </span>
                        <span className='add-pill-label-input'><input 
                        className='add-pill-input' 
                        name='bed_dose' 
                        type='text' 
                        placeholder='Number of Pills' 
                        value={this.props.selectedPill.Bed} 
                        onChange={this.props.handleChange}>
                        </input></span>
                </div>

                <br/>
                <button className='submitNew'>Submit</button>
           
            </form>
        </div>
    );
  }
}

export default withRouter(AddPill);