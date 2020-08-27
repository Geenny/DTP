import React, { Component } from "react";
import "./TextField.css";

export default class TextField extends Component {

    get value() { return this.props.value ? this.props.value.toString() : "0"; }
    get title() { return this.props.title ? `${this.props.title}: ` : ""; }
    get prefix() { return this.props.prefix ? this.props.prefix : ""; }

    render() {
        return (
            <div className="text-div">
               <div className="text text-padding">{ this.title }</div>
               <div className="text text-bold">{ this.value }</div>
               <div className="text text-padding">{ this.prefix }</div>
            </div>
        );
    }

}