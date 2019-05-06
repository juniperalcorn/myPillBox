import React, {Component} from 'react';
import {withRouter} from 'react-router'

class AddPill extends Component {
  constructor(props){
      super(props)
      this.state={
          listOpen: false, 
      }
      this.toggleList=this.toggleList.bind(this)
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }
  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    return (
        <div className="add-pill">
                <select value={this.props.selectedPill.id} onChange={this.props.handleSelect}>
                    {this.props.pills.map((pill)=>(
                        <option key={pill.id} value={pill.id}>{pill.name}, {pill.mg}mg</option>
                    ))}

                </select>
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

export default withRouter(AddPill);