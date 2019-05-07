import React, {Component} from 'react';
import {withRouter} from 'react-router'
import { getDose, deleteDose } from '../services/api-helper'


class ViewPill extends Component {
    constructor(props){
        super(props)
        this.state={
            doses:[],
            singlePill:{},
            currentUser:null,
        }
        this.getDoses=this.getDoses.bind(this)
        this.setSinglePill=this.setSinglePill.bind(this)
        this.showSinglePill=this.showSinglePill.bind(this)
    }

    componentDidMount(){
        this.setState({currentUser:this.props.currentUser})
        this.getDoses()
        this.setSinglePill()
    }

  async getDoses() {
    const doses = await getDose(this.state.currentUser)
    const params = parseInt(this.props.match.params.id)
    const singlePill = this.state.doses.find((dose) => dose.pill_id===params)
    this.setState({
        doses: doses,
        singlePill: singlePill
    })
    console.log('doses state', this.state.doses)
    console.log('pill state in get doses',this.state.singlePill)
    console.log('params',params)
    console.log('singlePill in get doses', singlePill)
    }

  async setSinglePill(){
    const params = parseInt(this.props.match.params.id)
    const singlePill= this.state.doses.find((dose) => dose.pill_id===params)
    await this.setState({
        singlePill
    })
    
    console.log('pill state',this.state.singlePill)
  }

  showSinglePill(){
    const singlePillArray = []
    const params = parseInt(this.props.match.params.id)
    const singlePill= this.state.doses.find((dose) => dose.pill_id===params)
    singlePillArray[0] = singlePill
    // const mapPill = singlePillArray.push(singlePill)
    console.log('single pill in map', singlePill)
    console.log('pill array', singlePillArray)
    // if (singlePillArray.length>0) {
    //     return singlePillArray.map(el=>(
    //     <div key={el.id}>
    //         <h2>{el.pill.name}, {el.pill.mg} mg</h2>

    //     </div>
    // ))} 
  }

//   async deleteDose(){
//       const deleteDose = await deleteDose(this.state.userId)
//   }

  render(){
    const params = parseInt(this.props.match.params.id)
    const singlePill = this.state.doses.find((dose) => dose.pill_id===params)
    console.log('in render, single pill', singlePill)
        return (
            <div className="viewPill">
            VIEW PILL
            {this.showSinglePill()}
                <>
                <h2>{singlePill && singlePill.pill.name}, {singlePill && singlePill.pill.mg}mg</h2>
                <img src={singlePill && singlePill.pill.img}/>
                <ul>
                    <li>Morning dose: {singlePill && singlePill.am_dose} pill</li>
                    <li>Midday dose: {singlePill && singlePill.mid_dose} pill</li>
                    <li>Evening dose: {singlePill && singlePill.pm_dose} pill</li>
                    <li>Bedtime dose: {singlePill && singlePill.bed_dose} pill</li>
                </ul>  
                </>
                
                <button>Update</button>
                <button>Delete</button>
            </div>
  );
  }
}

export default withRouter(ViewPill);