import React, {Component} from 'react';
import {withRouter} from 'react-router'

class PillDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            doses:[],
            singlePill:{},
        }
        this.findPill=this.findPill.bind(this)
        this.saveDoses=this.saveDoses.bind(this)
    }
    componentDidMount(){
        this.saveDoses()
        // this.findPill()
        console.log('did mount props, doses', this.props.doses)
        console.log('did mount userId', this.props.currentUserId)
    }
    async saveDoses(){
        console.log('doses props in pilldetail', this.props.doses)
        await this.setState({doses: this.props.doses})
        console.log('doses state in pilldetail', this.state.doses)
    }
    findPill(){
        const params = this.props.match.params.id
        const singlePill = this.props.doses.find((dose) => dose.id===params)
        this.setState({singlePill})
        console.log('singlePill in pillDetail', singlePill)
        console.log('set state with singlePill in pillDetail', this.state.singlePill)
        console.log('params', params)
        console.log('match params id', this.props.match.params.id)
        console.log('doses in pillDetail', this.props.doses)
    }
    render(){
        return(
            <div className='pillDetail'>
            </div>
        )
    }
}
export default withRouter(PillDetail)