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
            singular: 'pill',
            plural: 'pills',
        }
        this.getDoses=this.getDoses.bind(this)
    }

    componentDidMount(){
        this.setState({currentUser:this.props.currentUser})
        this.getDoses()
        this.props.pillId(this.props.match.params.id)
    }

  async getDoses() {
    const doses = await getDose(this.state.currentUser)
    const params = await parseInt(this.props.match.params.id)
    const singlePill = await doses.find((dose) => dose.pill_id===params)
    await this.setState({
        doses: doses,
        singlePill: singlePill
    })
    }


  render(){
    const params = parseInt(this.props.match.params.id)
    const singlePill = this.state.doses.find((dose) => dose.pill_id===params)
        return (
            <div className="doses">
                    <h2 className='viewPill-h2'>Pill Detail</h2>
                    <h2 className='viewPill-h2'>{singlePill && singlePill.pill.name}, {singlePill && singlePill.pill.mg}mg</h2>
                    <img src={singlePill && singlePill.pill.img} alt='Pill'/>
                    {this.state.isEdit
                    ?
                    <>
                    <form onSubmit={(e)=>{
                    e.preventDefault()
                    this.props.updateDose(singlePill.user_id, this.state.singlePill.id)
                    this.setState({isEdit: false})
                    }}>
                        <p>Morning Dose:</p>
                        <input name='am_dose' type='text' placeholder={singlePill && singlePill.am_dose} value={this.props.dose.am_dose} onChange={this.props.handleChange}></input>
                        <p>Midday Dose:</p>
                        <input name='mid_dose' type='text' placeholder={singlePill && singlePill.mid_dose} value={this.props.dose.mid_dose} onChange={this.props.handleChange}></input>
                        <p>PM Dose:</p>
                        <input name='pm_dose' type='text' placeholder={singlePill && singlePill.pm_dose} value={this.props.dose.pm_dose} onChange={this.props.handleChange}></input>
                        <p>Bed Dose:</p>
                        <input name='bed_dose' type='text' placeholder={singlePill && singlePill.bed_dose} value={this.props.dose.bed_dose} onChange={this.props.handleChange}></input>
                        <br/>
                    <button>Submit Changes</button>
                    </form>
                    <button onClick={()=>{this.props.destroyDose(singlePill.id)}}>Delete</button>
                    </>
                    :
                    <>
                    <ul>
                        <li>Morning dose: <span className='doseNumber'>{singlePill && singlePill.am_dose}</span></li>
                        <li>Midday dose: <span className='doseNumber'>{singlePill && singlePill.mid_dose}</span></li>
                        <li>Evening dose: <span className='doseNumber'>{singlePill && singlePill.pm_dose}</span></li>
                        <li>Bedtime dose: <span className='doseNumber'>{singlePill && singlePill.bed_dose}</span></li>
                    </ul>  
                    
                    <button className='createNew' onClick={()=>{this.setState({isEdit: singlePill.id})}}>Update</button>
                    </>
                    }

            </div>
  );
  }
}

export default withRouter(ViewPill);