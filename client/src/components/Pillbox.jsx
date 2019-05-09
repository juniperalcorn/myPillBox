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
      this.props.history.push('/noon')
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
            <div className='pillbox-segment' onClick={this.goToAM}><p className='pillbox-title'>Morning</p></div>
            <div className='pillbox-segment' onClick={this.goToMid}><p className='pillbox-title'>Noon</p></div>
            <div className='pillbox-segment' onClick={this.goToEvening}><p className='pillbox-title'>Evening</p></div>
            <div className='pillbox-segment' onClick={this.goToBed}><p className='pillbox-title'>Bed</p></div>
        </div>
    </div>
  );
  }
}

export default withRouter(Pillbox);