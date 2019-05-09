import React, {Component} from 'react'

class Modal extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const showHideModal = this.props.show ? 'modal display-block' : 'modal display-none'
        return(
            <div className={showHideModal}>
                <div className = 'modal-header'>
                    <div className='modal-main'>
                        <span className='instructions-title-logo'>myPillBox</span><button className='modal-x'onClick={this.props.handleClose}>X</button>
                    </div>
                </div>

                <div className='modal-body'>
                    <p>Confirm delete.</p>
                    <button onClick={()=>{
                        this.props.handleDelete(this.props.pillId)
                        this.props.handleClose()
                    }}>Delete Medication From PillBox</button>
                </div>
            </div>
        )
    }
}
export default Modal