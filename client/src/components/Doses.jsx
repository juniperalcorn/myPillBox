import React, {Component} from 'react';
import {withRouter} from 'react-router'

class Doses extends Component {
    constructor(props){
        super(props)
        this.state={
            filter:this.props.filter
        }
        this.showDoses=this.showDoses.bind(this)
    }

    //this.props.pills.find

//   matchPillToDose(){
//       this.props.doses.map(dose=>{
//          <div key={dose.id}>
//             {const findPill = this.props.pills.find(pill=>pill.id === dose.pill_id)}

//          </div>
//       })
//   }  

 
  showDoses(){
      
      if (this.props.filter==='am_dose'){
          return this.props.doses.map(dose=>(
              <div key={dose.id}>
                <p>Take {dose.am_dose} of {dose.pill.name}</p>
              </div>
          ))
      } else if (this.props.filter==='mid_dose'){
        return this.props.doses.map(dose=>(
            <div key={dose.id}>
                <p>Take {dose.am_dose} of pill {dose.pill_id}</p>
            </div>
        ))
    } else if (this.props.filter==='pm_dose'){
       return this.props.doses.map(dose=>(
            <div key={dose.id}>
                <p>Take {dose.am_dose} of pill {dose.pill_id}</p>
            </div>
        ))
    } else if (this.props.filter==='bed_dose'){
       return this.props.doses.map(dose=>(
            <div key={dose.id}>
                <p>Take {dose.am_dose} of pill {dose.pill_id}</p>
            </div>
        ))
    } 
  }

  render(){
  return (
    <div className="doses">
        <h1>{this.props.header}</h1>
        {this.showDoses()}
    </div>
  );
  }
}

export default withRouter(Doses);