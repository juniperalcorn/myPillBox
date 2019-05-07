import React, {Component} from 'react';
import {withRouter} from 'react-router'
import { getDose } from '../services/api-helper'


class ViewPill extends Component {
    constructor(props){
        super(props)
        this.state={
            doses:[],
            singlePill: {},
            currentUser:null,
            isEdit: false,
        }
        this.getDoses=this.getDoses.bind(this)
    }

    componentDidMount(){
        this.setState({currentUser:this.props.currentUser})
        this.getDoses()
        this.props.pillId(this.props.match.params.id)
        console.log('component did mount single pill', this.state.singlePill)
    }

  async getDoses() {
    const doses = await getDose(this.state.currentUser)
    const params = await parseInt(this.props.match.params.id)
    const singlePill = await doses.find((dose) => dose.pill_id===params)
    await this.setState({
        doses: doses,
        singlePill: singlePill
    })
    console.log('pill state in get doses', this.state.singlePill)
    }



  render(){
    const params = parseInt(this.props.match.params.id)
    const singlePill = this.state.doses.find((dose) => dose.pill_id===params)
    console.log('in render, single pill', singlePill)
        return (
            <div className="viewPill">
                <div className='staticView'>
                    <h2>Pill Detail</h2>
                    <h2>{singlePill && singlePill.pill.name}, {singlePill && singlePill.pill.mg}mg</h2>
                    <img src={singlePill && singlePill.pill.img} alt='Pill'/>
                    {this.state.isEdit
                    ?
                    <>
                    <form onSubmit={this.props.updateDose}>
                        <p>Morning Dose:</p>
                        <input name='am_dose' type='text' placeholder={singlePill && singlePill.am_dose} value={this.props.selectedPill.AM} onChange={this.props.handleChange}></input>
                        <p>Midday Dose:</p>
                        <input name='mid_dose' type='text' placeholder={singlePill && singlePill.mid_dose} value={this.props.selectedPill.Mid} onChange={this.props.handleChange}></input>
                        <p>PM Dose:</p>
                        <input name='pm_dose' type='text' placeholder={singlePill && singlePill.pm_dose} value={this.props.selectedPill.PM} onChange={this.props.handleChange}></input>
                        <p>Bed Dose:</p>
                        <input name='bed_dose' type='text' placeholder={singlePill && singlePill.bed_dose} value={this.props.selectedPill.Bed} onChange={this.props.handleChange}></input>
                        <br/>
                    </form>
                    <button onClick={()=>{this.setState({isEdit: false})}}>Submit Changes</button>
                    <button onClick={()=>{this.props.destroyDose(singlePill.id)}}>Delete</button>
                    </>
                    :
                    <>
                    <ul>
                        <li>Morning dose: {singlePill && singlePill.am_dose} pill</li>
                        <li>Midday dose: {singlePill && singlePill.mid_dose} pill</li>
                        <li>Evening dose: {singlePill && singlePill.pm_dose} pill</li>
                        <li>Bedtime dose: {singlePill && singlePill.bed_dose} pill</li>
                    </ul>  
                    
                    <button onClick={()=>{this.setState({isEdit: singlePill.id})}}>Update</button>
                    </>
                    }

                </div>

                <div className='editView'>
                    <form>

                    </form>

                    
                    
                </div>
            </div>
  );
  }
}

export default withRouter(ViewPill);