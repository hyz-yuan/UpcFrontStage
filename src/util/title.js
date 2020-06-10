import * as React from "react";

export default class title extends React.Component{
    render(){
        return (<div style={{fontSize:'20px',textAlign:'center'}} >{this.props.value}</div>)
           }
}