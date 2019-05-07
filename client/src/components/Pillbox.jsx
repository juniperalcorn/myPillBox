import React, {Component} from 'react';
import {withRouter} from 'react-router'

class Pillbox extends Component {
    constructor(props){
        super(props)
        this.state={
            isAdd:false,
        }
        this.goToAM=this.goToAM.bind(this)
        this.goToMid=this.goToMid.bind(this)
        this.goToEvening=this.goToEvening.bind(this)
        this.goToBed=this.goToBed.bind(this)
    }

  goToAM(){
    this.props.history.push('/morning')
  }
  goToMid(){
      this.props.history.push('/midday')
  }
  goToEvening(){
      this.props.history.push('/evening')
  }
  goToBed(){
      this.props.history.push('/bed')
  }
  render(){
  return (
    <div className="pillbox">
        <div className='pillbox-contain'>
            <div className='pillbox-segment' onClick={this.goToAM}>AM</div>
            <div className='pillbox-segment' onClick={this.goToMid}>Mid</div>
            <div className='pillbox-segment' onClick={this.goToEvening}>PM</div>
            <div className='pillbox-segment' onClick={this.goToBed}>Bed</div>
        </div>
        <button onClick={this.props.createNew}>Add New Pill</button>
    </div>
  );
  }
}

export default withRouter(Pillbox);