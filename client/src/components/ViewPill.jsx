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
        // this.showUpdate=this.showUpdate.bind(this)
    }

    componentDidMount(){
        this.setState({currentUser:this.props.currentUser})
        this.getDoses()
    }

    async getDoses() {
        const doses = await getDose(this.props.currentUser)
        const userDoses = await doses.filter(dose=>dose.user_id === this.props.currentUser)
        const params = parseInt(this.props.match.params.id)
        const singlePill = await userDoses.find(dose=> dose.id===params)
        await this.setState({
            doses: userDoses,
            singlePill: singlePill
        })
        this.props.pillId(this.state.singlePill.pill_id)
        console.log('single pill state in viewPill', this.state.singlePill)

        console.log('user in viewPill', this.props.currentUser)
        console.log('doses state in viewPill', this.state.doses)
        }

    showModal(){
        this.setState({modal: true})
    }
    hideModal(){
        this.setState({modal:false})
    }
    // showUpdate(){
    //     this.setState(prevState=>({
    //         singlePill:{

    //         }
    //     }))
    // }

  render(){
    const params = parseInt(this.props.match.params.id)
    const singlePill = this.state.doses.find(dose => dose.id===params)
    console.log('render singlePill', singlePill)
        return (
            <div className="doses viewPill">
                <h2 className='viewPill-h2'>Pill Detail: {singlePill && this.state.singlePill.pill.name}, {singlePill && this.state.singlePill.pill.mg}mg</h2>
                
                <div className='doseContain'>
                <img id='singlePillImg' src={singlePill && this.state.singlePill.pill.img} alt='Pill'/>
                    
                    
                    {this.state.isEdit
                    ?
                    <>
                        <div className='doseList edit'>
                            <form onSubmit={(e)=>{
                            e.preventDefault()
                            this.props.updateDose(this.props.currentUser, this.state.singlePill.id)
                            this.setState({
                                isEdit: false
                            })
                            this.getDoses()
                            }}>
                                <div className='editOpt'>
                                <span className='editLabel'>Morning Dose:</span>
                                <span className='editInput-span'>
                                    <input 
                                    className='editInput' 
                                    name='am_dose' 
                                    type='text' 
                                    placeholder={singlePill && this.state.singlePill.am_dose} 
                                    value={this.props.dose.AM} 
                                    onChange={this.props.handleChange}></input></span>
                                </div>

                                <div className='editOpt'>
                                <span className='editLabel'>Midday Dose:</span>
                                <span className='editInput-span'>
                                    <input 
                                    className='editInput' 
                                    name='mid_dose' 
                                    type='text' 
                                    placeholder={singlePill && this.state.singlePill.mid_dose} 
                                    value={this.props.dose.Mid} 
                                    onChange={this.props.handleChange}></input></span>
                                </div>

                                <div className='editOpt'>
                                <span className='editLabel'>PM Dose:</span>
                                <span className='editInput-span'>
                                    <input 
                                    className='editInput' 
                                    name='pm_dose' 
                                    type='text' 
                                    placeholder={singlePill && this.state.singlePill.pm_dose} 
                                    value={this.props.dose.PM} 
                                    onChange={this.props.handleChange}></input></span>
                                </div>

                                <div className='editOpt'>
                                <span className='editLabel'>Bed Dose:</span>
                                <span className='editInput-span'>
                                    <input 
                                    className='editInput' 
                                    name='bed_dose' 
                                    type='text' 
                                    placeholder={singlePill && this.state.singlePill.bed_dose} 
                                    value={this.props.dose.Bed} 
                                    onChange={this.props.handleChange}></input></span>
                                </div>
                                <br/>
                            <button className='headerButton view'>Submit Changes</button>
                            </form>
                            <Modal 
                                show={this.state.modal} 
                                handleClose={this.hideModal}
                                handleDelete={this.props.destroyDose}
                                doseId={this.state.singlePill.id}
                                >
                            </Modal>
                            <button className='createNew update' onClick={this.showModal}>Delete</button>
                        </div>
                    </>
                    :
                    <>
                        <div className='doseList'>
                            <ul>
                                <li>Morning dose: <span className='doseNumber'>{singlePill && this.state.singlePill.am_dose}</span></li>
                                <li>Midday dose: <span className='doseNumber'>{singlePill && this.state.singlePill.mid_dose}</span></li>
                                <li>Evening dose: <span className='doseNumber'>{singlePill && this.state.singlePill.pm_dose}</span></li>
                                <li>Bedtime dose: <span className='doseNumber'>{singlePill && this.state.singlePill.bed_dose}</span></li>
                            </ul>  
                        </div>   
                        <button className='headerButton view' onClick={()=>{this.setState({isEdit: true})}}>Update</button>
                        
                    </>
                    }
                    
                </div>      
            </div>
  );
  }
}

export default withRouter(ViewPill);