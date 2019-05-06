import React, {Component} from 'react';
import {withRouter} from 'react-router'

class Pillbox extends Component {
    constructor(props){
        super(props)
        this.state={
            isAdd:false,
        }
    }
  render(){
  return (
    <div className="pillbox">
        <div className='pillbox-contain'>
            <div className='pillbox-segment'>AM</div>
            <div className='pillbox-segment'>Mid</div>
            <div className='pillbox-segment'>PM</div>
            <div className='pillbox-segment'>Bed</div>
        </div>
        <button onClick={this.props.createNew}>Add New Pill</button>
    </div>
  );
  }
}

export default withRouter(Pillbox);