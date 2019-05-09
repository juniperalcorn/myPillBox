import React, {Component} from 'react'

class Modal extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const showHideModal = this.props.show ? 'modal display-block' : 'modal display-none'
        const pillId=this.props.pillId
        return(
            <div className={showHideModal}>
                <div className = 'modal-main'>
                    <div className='modal-header'>
                        <span className='instructions-title-logo'>myPillBox</span><button className='modal-x'onClick={this.props.handleClose}>EXIT</button>
                    </div>

                    <div className='modal-body'>
                    <p>Confirm delete.</p>
                    </div>

                    <button className='modal-delete' onClick={()=>{
                        this.props.handleDelete(pillId)
                        this.props.handleClose()
                    }}>Delete Medication From PillBox</button>
                </div>

              
            </div>
        )
    }
}
export default Modal