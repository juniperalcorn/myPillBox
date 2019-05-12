import React, {Component} from 'react';
import {withRouter} from 'react-router'
import { getDose } from '../services/api-helper'

import Modal from './Modal'


class ViewPill extends Component {
    constructor(props){
        super(props)
        this.state={
            doses:[],
            singlePill: {},
            currentUser:null,
            isEdit: false,
            modal: false,
        }
        this.getDoses=this.getDoses.bind(this)
        this.showModal=this.showModal.bind(this)
        this.hideModal=this.hideModal.bind(this)
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
        console.log('single pill', singlePill)
        console.log('state', this.state.singlePill)
        }

    showModal(){
        this.setState({modal: true})
    }
    hideModal(){
        this.setState({modal:false})
    }

  render(){
    const params = parseInt(this.props.match.params.id)
    const singlePill = this.state.doses.find((dose) => dose.pill_id===params)
        return (
            <div className="doses viewPill">
                <h2 className='viewPill-h2'>Pill Detail: {singlePill && singlePill.pill.name}, {singlePill && singlePill.pill.mg}mg</h2>
                
                <div className='doseContain'>
                <img id='singlePillImg' src={singlePill && singlePill.pill.img} alt='Pill'/>
                    
                    
                    {this.state.isEdit
                    ?
                    <>
                        <div className='doseList edit'>
                            <form onSubmit={(e)=>{
                            e.preventDefault()
                            this.props.updateDose(singlePill.user_id, this.state.singlePill.id)
                            this.setState({isEdit: false})
                            }}>
                                <div className='editOpt'>
                                <span className='editLabel'>Morning Dose:</span>
                                <span className='editInput-span'><input className='editInput' name='am_dose' type='text' placeholder={singlePill && singlePill.am_dose} value={this.props.dose.am_dose} onChange={this.props.handleChange}></input></span>
                                </div>

                                <div className='editOpt'>
                                <span className='editLabel'>Midday Dose:</span>
                                <span className='editInput-span'><input className='editInput' name='mid_dose' type='text' placeholder={singlePill && singlePill.mid_dose} value={this.props.dose.mid_dose} onChange={this.props.handleChange}></input></span>
                                </div>

                                <div className='editOpt'>
                                <span className='editLabel'>PM Dose:</span>
                                <span className='editInput-span'><input className='editInput' name='pm_dose' type='text' placeholder={singlePill && singlePill.pm_dose} value={this.props.dose.pm_dose} onChange={this.props.handleChange}></input></span>
                                </div>

                                <div className='editOpt'>
                                <span className='editLabel'>Bed Dose:</span>
                                <span className='editInput-span'><input className='editInput' name='bed_dose' type='text' placeholder={singlePill && singlePill.bed_dose} value={this.props.dose.bed_dose} onChange={this.props.handleChange}></input></span>
                                </div>
                                <br/>
                            <button className='headerButton view'>Submit Changes</button>
                            </form>
                            <Modal 
                                show={this.state.modal} 
                                handleClose={this.hideModal}
                                handleDelete={this.props.destroyDose}
                                pillId={singlePill.id}
                                >
                            </Modal>
                            <button className='createNew update' onClick={this.showModal}>Delete</button>
                        </div>
                    </>
                    :
                    <>
                        <div className='doseList'>
                            <ul>
                                <li>Morning dose: <span className='doseNumber'>{singlePill && singlePill.am_dose}</span></li>
                                <li>Midday dose: <span className='doseNumber'>{singlePill && singlePill.mid_dose}</span></li>
                                <li>Evening dose: <span className='doseNumber'>{singlePill && singlePill.pm_dose}</span></li>
                                <li>Bedtime dose: <span className='doseNumber'>{singlePill && singlePill.bed_dose}</span></li>
                            </ul>  
                        </div>   
                        <button className='headerButton view' onClick={()=>{this.setState({isEdit: singlePill.id})}}>Update</button>
                        
                    </>
                    }
                    
                </div>      
            </div>
  );
  }
}

export default withRouter(ViewPill);