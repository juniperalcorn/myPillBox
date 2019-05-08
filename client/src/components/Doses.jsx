import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

class Doses extends Component {
    constructor(props){
        super(props)
        this.state={
            filter:this.props.filter
        }
        this.showDoses=this.showDoses.bind(this)
    }

 showDoses(){
      
      if (this.props.filter==='am_dose'){
          return this.props.doses.map(dose=>(
              <Link to={`/viewpill/${dose.pill_id}`} key={dose.id} >
                <div className='individual-dose'><img src={dose.pill.img} alt={dose.pill.name}/>Take {dose.am_dose} {dose.pill.name}</div>
              </Link>
          ))
      } else if (this.props.filter==='mid_dose'){
        return this.props.doses.map(dose=>(
            <Link to={`/viewpill/${dose.pill_id}`} key={dose.id} >
                <div className='individual-dose'><img src={dose.pill.img} alt={dose.pill.name}/>Take {dose.mid_dose} {dose.pill.name}</div>
            </Link>
        ))
    } else if (this.props.filter==='pm_dose'){
       return this.props.doses.map(dose=>(
            <Link to={`/viewpill/${dose.pill_id}`} key={dose.id} >
                <div className='individual-dose'><img src={dose.pill.img} alt={dose.pill.name}/>Take {dose.pm_dose} {dose.pill.name}</div>
            </Link>
        ))
    } else if (this.props.filter==='bed_dose'){
       return this.props.doses.map(dose=>(
            <Link to={`/viewpill/${dose.pill_id}`} key={dose.id} >
                <div className='individual-dose'><img src={dose.pill.img} alt={dose.pill.name}/>Take {dose.bed_dose} {dose.pill.name}</div>
            </Link>
        ))
    } 
  }

  render(){
  return (
    <div className="doses">
        <h1 id='doses-header'>{this.props.header} Pills</h1>
        {this.showDoses()}
        <div className='doses-instructions'>Click on a medication for more information, or to edit dose.</div>
    </div>
  );
  }
}

export default withRouter(Doses);