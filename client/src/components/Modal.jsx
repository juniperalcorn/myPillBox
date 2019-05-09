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
                <div className='modal-main'>
                    <button onClick={this.props.handleClose}>close</button>
                </div>
            </div>
        )
    }
}
export default Modal