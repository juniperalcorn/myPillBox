import React, {Component} from 'react';
import {withRouter} from 'react-router'
import { getDose, deleteDose } from '../services/api-helper'


class ViewPill extends Component {
    constructor(props){
        super(props)
        this.state={
            doses:[],
            singlePill: {},
            currentUser:null,
        }
        this.getDoses=this.getDoses.bind(this)
    }

    componentDidMount(){
        this.setState({currentUser:this.props.currentUser})
        this.getDoses()
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
           
                <h2>Pill Detail</h2>
                <h2>{singlePill && singlePill.pill.name}, {singlePill && singlePill.pill.mg}mg</h2>
                <img src={singlePill && singlePill.pill.img}/>
                <ul>
                    <li>Morning dose: {singlePill && singlePill.am_dose} pill</li>
                    <li>Midday dose: {singlePill && singlePill.mid_dose} pill</li>
                    <li>Evening dose: {singlePill && singlePill.pm_dose} pill</li>
                    <li>Bedtime dose: {singlePill && singlePill.bed_dose} pill</li>
                </ul>  
                
                <button>Update</button>
                <button onClick={()=>{this.props.destroyDose(singlePill.id)}}>Delete</button>
            </div>
  );
  }
}

export default withRouter(ViewPill);